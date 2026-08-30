package com.kepceburada.app;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private ValueCallback<Uri[]> filePathCallback;
    private boolean splashTransitionDone = false;

    private final ActivityResultLauncher<String[]> locationPermissionLauncher =
        registerForActivityResult(
            new ActivityResultContracts.RequestMultiplePermissions(),
            result -> {
                Boolean fine = result.getOrDefault(Manifest.permission.ACCESS_FINE_LOCATION, false);
                Boolean coarse = result.getOrDefault(Manifest.permission.ACCESS_COARSE_LOCATION, false);
                if ((fine != null && fine) || (coarse != null && coarse)) {
                    detectAndApplyUserLocation();
                }
            }
        );

    private final ActivityResultLauncher<String[]> galleryPermissionLauncher =
        registerForActivityResult(
            new ActivityResultContracts.RequestMultiplePermissions(),
            result -> {
                triggerWebFileChooser();
            }
        );

    public class WebAppInterface {
        @JavascriptInterface
        public void makeCall(String phoneNumber) {
            if (phoneNumber == null || phoneNumber.trim().isEmpty()) return;
            final String cleanPhone = phoneNumber.replaceAll("\\D", "");
            runOnUiThread(() -> performCallIntent("tel:" + cleanPhone));
        }

        @JavascriptInterface
        public void openWhatsApp(String url) {
            if (url == null || url.trim().isEmpty()) return;
            runOnUiThread(() -> performViewIntent(url));
        }

        @JavascriptInterface
        public void openGallery() {
            runOnUiThread(() -> requestGalleryPermissionAndOpen());
        }

        @JavascriptInterface
        public void requestLocation() {
            runOnUiThread(() -> requestLocationPermissionAndDetect());
        }

        @JavascriptInterface
        public void saveListingsToNative(String jsonListings) {
            if (jsonListings == null) return;
            try {
                File file = new File(getFilesDir(), "makinebul_listings.json");
                FileOutputStream fos = new FileOutputStream(file);
                fos.write(jsonListings.getBytes(StandardCharsets.UTF_8));
                fos.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @JavascriptInterface
        public String loadListingsFromNative() {
            try {
                File file = new File(getFilesDir(), "makinebul_listings.json");
                if (!file.exists()) return "";
                FileInputStream fis = new FileInputStream(file);
                byte[] data = new byte[(int) file.length()];
                fis.read(data);
                fis.close();
                return new String(data, StandardCharsets.UTF_8);
            } catch (Exception e) {
                return "";
            }
        }
    }

    private final ActivityResultLauncher<Intent> fileChooserLauncher =
        registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            new ActivityResultCallback<ActivityResult>() {
                @Override
                public void onActivityResult(ActivityResult result) {
                    if (filePathCallback == null) return;
                    Uri[] results = null;
                    try {
                        if (result.getResultCode() == Activity.RESULT_OK && result.getData() != null) {
                            Intent data = result.getData();
                            if (data.getClipData() != null) {
                                int count = data.getClipData().getItemCount();
                                results = new Uri[count];
                                for (int i = 0; i < count; i++) {
                                    results[i] = data.getClipData().getItemAt(i).getUri();
                                }
                            } else if (data.getData() != null) {
                                results = new Uri[]{data.getData()};
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    filePathCallback.onReceiveValue(results);
                    filePathCallback = null;
                }
            }
        );

    @SuppressLint({"SetJavaScriptEnabled", "JavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Window window = getWindow();
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        window.setStatusBarColor(Color.parseColor("#0B0F17"));

        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setLoadsImagesAutomatically(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setTextZoom(100);

        webView.clearCache(true);
        webView.setOverScrollMode(View.OVER_SCROLL_IF_CONTENT_SCROLLS);
        webView.setVerticalScrollBarEnabled(true);
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);

        // Native JS bridge
        webView.addJavascriptInterface(new WebAppInterface(), "AndroidNative");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                if (request != null && request.getUrl() != null) {
                    String url = request.getUrl().toString();
                    if (handleSpecialUrl(url)) {
                        return true;
                    }
                }
                return false;
            }

            @SuppressWarnings("deprecation")
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (handleSpecialUrl(url)) {
                    return true;
                }
                return false;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);

                // Restore listings from Android internal storage if available
                restoreListingsIfAvailable();
                
                if (!splashTransitionDone) {
                    splashTransitionDone = true;
                    // 1. İlk Açılış Ekranı (1.8 Saniye 3D JCB Beko Loder) -> Sonrasında Karşılama Ekranına Yumuşak Geçiş
                    new Handler(Looper.getMainLooper()).postDelayed(() -> {
                        View loadingView = findViewById(R.id.loadingView);
                        if (loadingView != null) {
                            loadingView.animate()
                                .alpha(0.0f)
                                .setDuration(400)
                                .withEndAction(() -> {
                                    loadingView.setVisibility(View.GONE);
                                    webView.setVisibility(View.VISIBLE);
                                    requestLocationPermissionAndDetect();
                                });
                        } else {
                            webView.setVisibility(View.VISIBLE);
                            requestLocationPermissionAndDetect();
                        }
                    }, 2000);
                }
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView webView,
                                             ValueCallback<Uri[]> filePathCallback,
                                             FileChooserParams fileChooserParams) {
                if (MainActivity.this.filePathCallback != null) {
                    MainActivity.this.filePathCallback.onReceiveValue(null);
                    MainActivity.this.filePathCallback = null;
                }
                MainActivity.this.filePathCallback = filePathCallback;

                requestGalleryPermissionAndOpen();
                return true;
            }
        });

        webView.setVisibility(View.INVISIBLE);
        webView.loadUrl("file:///android_asset/index.html");
    }

    private void restoreListingsIfAvailable() {
        try {
            File file = new File(getFilesDir(), "makinebul_listings.json");
            if (file.exists() && file.length() > 0) {
                FileInputStream fis = new FileInputStream(file);
                byte[] data = new byte[(int) file.length()];
                fis.read(data);
                fis.close();
                String jsonStr = new String(data, StandardCharsets.UTF_8);
                if (!jsonStr.trim().isEmpty() && webView != null) {
                    runOnUiThread(() -> {
                        webView.evaluateJavascript("restoreNativeListings(" + jsonStr + ")", null);
                    });
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void requestLocationPermissionAndDetect() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED ||
            ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            detectAndApplyUserLocation();
        } else {
            locationPermissionLauncher.launch(new String[]{
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION
            });
        }
    }

    private void detectAndApplyUserLocation() {
        try {
            LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            if (locationManager == null) return;

            Location bestLocation = null;
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED ||
                ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                
                Location gpsLoc = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                Location netLoc = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);

                if (gpsLoc != null && netLoc != null) {
                    bestLocation = gpsLoc.getTime() > netLoc.getTime() ? gpsLoc : netLoc;
                } else if (gpsLoc != null) {
                    bestLocation = gpsLoc;
                } else {
                    bestLocation = netLoc;
                }
            }

            if (bestLocation != null) {
                double lat = bestLocation.getLatitude();
                double lon = bestLocation.getLongitude();
                
                Geocoder geocoder = new Geocoder(this, new Locale("tr", "TR"));
                List<Address> addresses = geocoder.getFromLocation(lat, lon, 1);
                if (addresses != null && !addresses.isEmpty()) {
                    Address address = addresses.get(0);
                    String city = address.getAdminArea(); // e.g. "İstanbul", "Ankara", "Bingöl"
                    if (city != null && !city.isEmpty()) {
                        city = cleanCityName(city);
                        final String finalCity = city;
                        runOnUiThread(() -> {
                            if (webView != null) {
                                webView.evaluateJavascript("confirmManualLocation('" + finalCity + "')", null);
                            }
                        });
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String cleanCityName(String rawCity) {
        if (rawCity == null) return "";
        return rawCity.replace("İli", "").replace("Province", "").replace("Vilayeti", "").trim();
    }

    private void requestGalleryPermissionAndOpen() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES) == PackageManager.PERMISSION_GRANTED) {
                triggerWebFileChooser();
            } else {
                galleryPermissionLauncher.launch(new String[]{Manifest.permission.READ_MEDIA_IMAGES});
            }
        } else {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {
                triggerWebFileChooser();
            } else {
                galleryPermissionLauncher.launch(new String[]{Manifest.permission.READ_EXTERNAL_STORAGE});
            }
        }
    }

    private void triggerWebFileChooser() {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("image/*");

        try {
            fileChooserLauncher.launch(Intent.createChooser(intent, "Fotoğraf Seç"));
        } catch (Exception e) {
            try {
                Intent fallback = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                fileChooserLauncher.launch(fallback);
            } catch (Exception ex) {
                if (filePathCallback != null) {
                    filePathCallback.onReceiveValue(null);
                    filePathCallback = null;
                }
            }
        }
    }

    private boolean handleSpecialUrl(String url) {
        if (url == null) return false;

        if (url.startsWith("tel:")) {
            performCallIntent(url);
            return true;
        }

        if (url.startsWith("whatsapp:") || url.startsWith("https://wa.me") || url.startsWith("https://api.whatsapp.com")) {
            performViewIntent(url);
            return true;
        }

        return false;
    }

    private void performCallIntent(String url) {
        try {
            String cleanNumber = url.replace("tel:", "").replaceAll("\\D", "");
            Uri uri = Uri.parse("tel:" + cleanNumber);
            Intent dialIntent = new Intent(Intent.ACTION_DIAL, uri);
            dialIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(dialIntent);
        } catch (Exception e) {
            try {
                Intent viewIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url.startsWith("tel:") ? url : "tel:" + url));
                viewIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(viewIntent);
            } catch (Exception ex) {
                Toast.makeText(this, "Arama başlatılamadı.", Toast.LENGTH_SHORT).show();
            }
        }
    }

    private void performViewIntent(String url) {
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
        } catch (Exception e) {
            Toast.makeText(this, "Bağlantı açılamadı.", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (webView != null) webView.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) webView.onResume();
    }

    @Override
    protected void onDestroy() {
        if (webView != null) webView.destroy();
        super.onDestroy();
    }
}
