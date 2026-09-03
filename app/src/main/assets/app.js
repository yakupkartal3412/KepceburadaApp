// Default Sample Machinery Listings (Ekskavatör, JCB, Bobcat, Manitou, Kamyon, Dozer, Vinç)
const DEFAULT_LISTINGS = [
  {
    id: "kepce-bingol-1",
    title: "CAT 320 Paletli Ekskavatör (Hafriyat & Kazı)",
    type: "Paletli Ekskavatör",
    city: "Bingöl",
    district: "Merkez",
    price: 4200,
    hourlyPrice: 525,
    period: "Günlük",
    operator: "Operatörlü",
    specs: "22 Ton | Kırıcı Uçlu",
    phone: "0532 111 22 33",
    owner: "Doğu Hafriyat Bingöl",
    image: "assets/yellow_excavator.png",
    status: "available",
    createdAt: new Date().toISOString()
  },
  {
    id: "kepce-bingol-2",
    title: "JCB 3CX Beko Loder Kepçe",
    type: "Beko Loder (JCB)",
    city: "Bingöl",
    district: "Genç",
    price: 3000,
    hourlyPrice: 375,
    period: "Günlük",
    operator: "Operatörlü",
    specs: "8.5 Ton | 4x4",
    phone: "0542 333 44 55",
    owner: "Bingöl İş Makineleri",
    image: "assets/backhoe_loader.png",
    status: "available",
    createdAt: new Date().toISOString()
  },
  {
    id: "kepce-bingol-3",
    title: "Kubota 3.5 Ton Mini Ekskavatör",
    type: "Mini Ekskavatör / Kepçe",
    city: "Bingöl",
    district: "Solhan",
    price: 2400,
    hourlyPrice: 300,
    period: "Günlük",
    operator: "Operatörsüz",
    specs: "3.5 Ton | Kauçuk Palet",
    phone: "0506 777 88 99",
    owner: "Solhan Mini Kepçe",
    image: "assets/mini_excavator.png",
    status: "available",
    createdAt: new Date().toISOString()
  },
  {
    id: "kepce-bingol-5",
    title: "Mercedes Axor Damperli Hafriyat Kamyonu",
    type: "Hafriyat Kamyonu",
    city: "Bingöl",
    district: "Karlıova",
    price: 3500,
    hourlyPrice: 438,
    period: "Günlük",
    operator: "Operatörlü",
    specs: "32 Ton Taşıma Kapasitesi",
    phone: "0539 444 55 66",
    owner: "Karlıova Nakliyat",
    image: "assets/axor_truck.png",
    status: "available",
    createdAt: new Date().toISOString()
  },
  {
    id: "kepce-elazig-1",
    title: "Bobcat S530 Mini Yükleyici",
    type: "Bobcat Mini Yükleyici",
    city: "Elazığ",
    district: "Merkez",
    price: 3200,
    hourlyPrice: 400,
    period: "Günlük",
    operator: "Operatörlü",
    specs: "Süpürge + Kova",
    phone: "0533 444 55 66",
    owner: "Elazığ Bobcat Kiralama",
    image: "assets/bobcat.png",
    status: "available",
    createdAt: new Date().toISOString()
  },
  {
    id: "kepce-elazig-2",
    title: "CAT D6R Ağır Hizmet Arazi Dozeri",
    type: "Dozer",
    city: "Elazığ",
    district: "Kovancılar",
    price: 5800,
    hourlyPrice: 725,
    period: "Günlük",
    operator: "Operatörlü",
    specs: "Ağır Hizmet Bıçağı",
    phone: "0534 555 66 77",
    owner: "Elazığ Dozer Kiralama",
    image: "assets/yellow_dozer.png",
    status: "available",
    createdAt: new Date().toISOString()
  },
  {
    id: "kepce-diyarbakir-1",
    title: "Manitou MT 1840 Teleskobik Yükleyici",
    type: "Manitou Telehandler",
    city: "Diyarbakır",
    district: "Kayapınar",
    price: 5000,
    hourlyPrice: 625,
    period: "Günlük",
    operator: "Operatörlü",
    specs: "18 Metre Ulaşım",
    phone: "0535 888 99 00",
    owner: "Diyarbakır Vinç & Manitou",
    image: "assets/manitou.png",
    status: "available",
    createdAt: new Date().toISOString()
  }
];

// LocalStorage Keys (v12 for clean refresh with exact photos)
const STORAGE_LISTINGS_KEY = "makinebul_listings_v12";
const STORAGE_REQUESTS_KEY = "makinebul_requests_v10";

// State Management
let listings = [];
let requests = [];
let activeMode = "rent";

// Türkiye 81 İl ve Kapsamlı Tüm İlçeleri Veri Kümesi
const TURKEY_CITIES = {
  "Adana": ["Aladağ", "Ceyhan", "Çukurova", "Feke", "İmamoğlu", "Karaisalı", "Karataş", "Kozan", "Pozantı", "Saimbeyli", "Sarıçam", "Seyhan", "Tufanbeyli", "Yumurtalık", "Yüreğir"],
  "Adıyaman": ["Besni", "Çelikhan", "Gerger", "Gölbaşı", "Kahta", "Merkez", "Samsat", "Sincik", "Tut"],
  "Afyonkarahisar": ["Başmakçı", "Bayat", "Bolvadin", "Çay", "Çobanlar", "Dazkırı", "Dinar", "Emirdağ", "Evciler", "Hocalar", "İhsaniye", "İscehisar", "Kızılören", "Merkez", "Sandıklı", "Sinanpaşa", "Sultandağı", "Şuhut"],
  "Ağrı": ["Diyadin", "Doğubayazıt", "Eleşkirt", "Hamur", "Merkez", "Patnos", "Taşlıçay", "Tutak"],
  "Amasya": ["Göynücek", "Gümüşhacıköy", "Hamamözü", "Merkez", "Merzifon", "Suluova", "Taşova"],
  "Ankara": ["Akyurt", "Altındağ", "Ayaş", "Bala", "Beypazarı", "Çamlıdere", "Çankaya", "Çubuk", "Elmadağ", "Etimesgut", "Evren", "Gölbaşı", "Güdül", "Haymana", "Kahramankazan", "Kalecik", "Keçiören", "Kızılcahamam", "Mamak", "Nallıhan", "Polatlı", "Pursaklar", "Sincan", "Şereflikoçhisar", "Yenimahalle"],
  "Antalya": ["Akseki", "Aksu", "Alanya", "Demre", "Döşemealtı", "Elmalı", "Finike", "Gazipaşa", "Gündoğmuş", "İbradı", "Kaş", "Kemer", "Kepez", "Konyaaltı", "Korkuteli", "Kumluca", "Manavgat", "Muratpaşa", "Serik"],
  "Artvin": ["Ardanuç", "Arhavi", "Borçka", "Hopa", "Kemalpaşa", "Merkez", "Murgul", "Şavşat", "Yusufeli"],
  "Aydın": ["Bozdoğan", "Buharkent", "Çine", "Didim", "Efeler", "Germencik", "İncirliova", "Karacasu", "Karpuzlu", "Koçarlı", "Köşk", "Kuşadası", "Kuyucak", "Nazilli", "Söke", "Sultanhisar", "Yenipazar"],
  "Balıkesir": ["Altıeylül", "Ayvalık", "Balya", "Bandırma", "Bigadiç", "Burhaniye", "Dursunbey", "Edremit", "Erdek", "Gömeç", "Gönen", "Havran", "İvrindi", "Karesi", "Kepsut", "Manyas", "Marmara", "Savaştepe", "Sındırgı", "Susurluk"],
  "Bilecik": ["Bozüyük", "Gölpazarı", "İnhisar", "Merkez", "Osmaneli", "Pazaryeri", "Söğüt", "Yenipazar"],
  "Bingöl": ["Adaklı", "Genç", "Karlıova", "Kiğı", "Merkez", "Solhan", "Yayladere", "Yedisu"],
  "Bitlis": ["Adilcevaz", "Ahlat", "Güroymak", "Hizan", "Merkez", "Mutki", "Tatvan"],
  "Bolu": ["Dörtdivan", "Gerede", "Göynük", "Kıbrıscık", "Mengen", "Merkez", "Mudurnu", "Seben", "Yeniçağa"],
  "Burdur": ["Ağlasun", "Altınyayla", "Bucak", "Çavdır", "Çeltikçi", "Gölhisar", "Karamanlı", "Kemer", "Merkez", "Tefenni", "Yeşilova"],
  "Bursa": ["Büyükorhan", "Gemlik", "Gürsu", "Harmancık", "İnegöl", "İznik", "Karacabey", "Keles", "Kestel", "Mudanya", "Mustafakemalpaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi", "Yenişehir", "Yıldırım"],
  "Çanakkale": ["Ayvacık", "Bayramiç", "Biga", "Bozcaada", "Çan", "Eceabat", "Ezine", "Gelibolu", "Gökçeada", "Lapseki", "Merkez", "Yenice"],
  "Çankırı": ["Atkaracalar", "Bayramören", "Çerkeş", "Eldivan", "Ilgaz", "Kızılırmak", "Korgun", "Kurşunlu", "Merkez", "Orta", "Şabanözü", "Yapraklı"],
  "Çorum": ["Alaca", "Bayat", "Boğazkale", "Dodurga", "İskilip", "Kargı", "Laçin", "Mecitözü", "Merkez", "Oğuzlar", "Ortaköy", "Osmancık", "Sungurlu", "Uğurludağ"],
  "Denizli": ["Acıpayam", "Babadağ", "Baklan", "Bekilli", "Beyağaç", "Bozkurt", "Buldan", "Çal", "Çameli", "Çardak", "Çivril", "Güney", "Honaz", "Kale", "Merkezefendi", "Pamukkale", "Sarayköy", "Serinhisar", "Tavas"],
  "Diyarbakır": ["Bağlar", "Bismil", "Çermik", "Çınar", "Çüngüş", "Dicle", "Eğil", "Ergani", "Hani", "Hazro", "Kayapınar", "Kocaköy", "Kulp", "Lice", "Silvan", "Sur", "Yenişehir"],
  "Edirne": ["Enez", "Havsa", "İpsala", "Keşan", "Lalapaşa", "Meriç", "Merkez", "Süloğlu", "Uzunköprü"],
  "Elazığ": ["Ağın", "Alacakaya", "Arıcak", "Baskil", "Karakoçan", "Keban", "Kovancılar", "Maden", "Merkez", "Palul", "Sivrice"],
  "Erzincan": ["Çayırlı", "İliç", "Kemah", "Kemaliye", "Merkez", "Otlukbeli", "Refahiye", "Tercan", "Üzümlü"],
  "Erzurum": ["Aşkale", "Aziziye", "Çat", "Hınıs", "Horasan", "İspir", "Karaçoban", "Karayazı", "Köprüköy", "Narman", "Oltu", "Olur", "Palandöken", "Pasinler", "Pazaryolu", "Şenkaya", "Tekman", "Tortum", "Uzundere", "Yakutiye"],
  "Eskişehir": ["Alpu", "Beylikova", "Çifteler", "Günyüzü", "Han", "İnönü", "Mahmudiye", "Mihalgazi", "Mihalıççık", "Odunpazarı", "Sarıcakaya", "Seyitgazi", "Sivrihisar", "Tepebaşı"],
  "Gaziantep": ["Arabam", "İslahiye", "Karkamış", "Nizip", "Oğuzeli", "Nurdağı", "Şahinbey", "Şehitkamil", "Yavuzeli"],
  "Giresun": ["Alucra", "Bulancak", "Çamoluk", "Çanakçı", "Dereli", "Doğankent", "Espiye", "Eynesil", "Görele", "Güce", "Keşap", "Merkez", "Piraziz", "Şebinkarahisar", "Tirebolu", "Yağlıdere"],
  "Gümüşhane": ["Kelkit", "Köse", "Kürtün", "Merkez", "Şiran", "Torul"],
  "Hakkari": ["Çukurca", "Derecik", "Merkez", "Şemdinli", "Yüksekova"],
  "Hatay": ["Altınözü", "Antakya", "Arsuz", "Belen", "Defne", "Dörtyol", "Erzin", "Hassa", "İskenderun", "Kırıkhan", "Kumlu", "Payas", "Reyhanlı", "Samandağ", "Yayladağı"],
  "Isparta": ["Aksu", "Atabey", "Eğirdir", "Gelendost", "Gönen", "Keçiborlu", "Merkez", "Senirkent", "Sütçüler", "Şarkikaraağaç", "Uluborlu", "Yalvaç", "Yenişarbademli"],
  "Mersin": ["Akdeniz", "Anamur", "Aydıncık", "Bozyazı", "Çamlıyayla", "Erdemli", "Gülnar", "Mezitli", "Mut", "Silifke", "Tarsus", "Toroslar", "Yenişehir"],
  "İstanbul": ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"],
  "İzmir": ["Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Beydağ", "Bornova", "Buca", "Çeşme", "Çiğli", "Dikili", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karaburun", "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla"],
  "Kars": ["Akyaka", "Arpaçay", "Digor", "Kağızman", "Merkez", "Sarıkamış", "Selim", "Susuz"],
  "Kastamonu": ["Abana", "Ağlı", "Araç", "Azdavay", "Bozkurt", "Cide", "Çatalzeytin", "Daday", "Devrekani", "Doğanyurt", "Hanönü", "İhsangazı", "İnebolu", "Küre", "Merkez", "Pınarbaşı", "Seydiler", "Şenpazar", "Taşköprü", "Tosya"],
  "Kayseri": ["Akkışla", "Bünyan", "Develi", "Felahiye", "Hacılar", "İncesu", "Kocasinan", "Melikgazi", "Özvatan", "Pınarbaşı", "Sarıoğlan", "Sarız", "Talas", "Tomarza", "Yahyalı", "Yeşilhisar"],
  "Kırklareli": ["Babaeski", "Demirköy", "Kofçaz", "Lüleburgaz", "Merkez", "Pehlivanköy", "Pınarhisar", "Vize"],
  "Kırşehir": ["Akçakent", "Akpınar", "Boztepe", "Çiçekdağı", "Kaman", "Merkez", "Mucur"],
  "Kocaeli": ["Başiskele", "Çayırova", "Darıca", "Derince", "Dilovası", "Gebze", "Gölcük", "İzmit", "Körfez", "Kandıra", "Karamürsel", "Kartepe"],
  "Konya": ["Ahırlı", "Akören", "Akşehir", "Altınekin", "Beyşehir", "Bozkır", "Cihanbeyli", "Çeltik", "Çumra", "Derbent", "Derebucak", "Doğanhisar", "Emirgazi", "Ereğli", "Güneysınır", "Hadim", "Halkapınar", "Hüyük", "Ilgın", "Kadınhanı", "Karapınar", "Karatay", "Kulu", "Meram", "Sarayönü", "Selçuklu", "Seydişehir", "Taşkent", "Yalıhüyük", "Yunak"],
  "Kütahya": ["Altıntaş", "Aslanapa", "Çavdarhisar", "Domaniç", "Dumlupınar", "Emet", "Gediz", "Hisarcık", "Merkez", "Pazarlar", "Şaphane", "Simav", "Tavşanlı"],
  "Malatya": ["Akçadağ", "Arapgir", "Arguvan", "Battalgazi", "Darende", "Doğanşehir", "Doğanyol", "Hekimhan", "Kale", "Kuluncak", "Pütürge", "Yazıhan", "Yeşilyurt"],
  "Manisa": ["Ahmetli", "Akhisar", "Alaşehir", "Demirci", "Gölmarmara", "Gördes", "Kırkağaç", "Köprübaşı", "Kula", "Salihli", "Sarıgöl", "Saruhanlı", "Selendi", "Soma", "Şehzadeler", "Turgutlu", "Yunusemre"],
  "Kahramanmaraş": ["Afşin", "Andırın", "Çağlayancerit", "Dulkadiroğlu", "Ekinözü", "Elbistan", "Göksun", "Nurhak", "Onikişubat", "Pazarcık", "Türkoğlu"],
  "Mardin": ["Artuklu", "Dargeçit", "Derik", "Kızıltepe", "Mazıdağı", "Midyat", "Nusaybin", "Ömerli", "Savur", "Yeşilli"],
  "Muğla": ["Bodrum", "Dalaman", "Datça", "Fethiye", "Kavaklıdere", "Köyceğiz", "Marmaris", "Menteşe", "Milas", "Ortaca", "Seydikemer", "Ula", "Yatağan"],
  "Muş": ["Bulanık", "Hasköy", "Korkut", "Malazgirt", "Merkez", "Varto"],
  "Nevşehir": ["Acıgöl", "Avanos", "Derinkuyu", "Gülşehir", "Hacıbektaş", "Kozaklı", "Merkez", "Ürgüp"],
  "Niğde": ["Altunhisar", "Bor", "Çamardı", "Çiftlik", "Merkez", "Ulukışla"],
  "Ordu": ["Akkuş", "Altınordu", "Aybastı", "Çamaş", "Çatalpınar", "Çaybaşı", "Fatsa", "Gölköy", "Gülyalı", "Gürgentepe", "İkizce", "Kabadüz", "Kabataş", "Korgan", "Kumru", "Mesudiye", "Perşembe", "Ulubey", "Ünye"],
  "Rize": ["Ardeşen", "Çamlıhemşin", "Çayeli", "Derepazarı", "Fındıklı", "Güneysu", "Hemşin", "İkizdere", "İyidere", "Kalkandere", "Merkez", "Pazar"],
  "Sakarya": ["Adapazarı", "Akyazı", "Arifiye", "Erenler", "Ferizli", "Geyve", "Hendek", "Karapürçek", "Karasu", "Kaynarca", "Kocaali", "Pamukova", "Sapanca", "Serdivan", "Söğütlü", "Taraklı"],
  "Samsun": ["19 Mayıs", "Alaçam", "Asarcık", "Atakum", "Ayvacık", "Bafra", "Canik", "Çarşamba", "Havza", "İlkadım", "Kavak", "Ladik", "Salıpazarı", "Tekkeköy", "Terme", "Vezirköprü", "Yakakent"],
  "Siirt": ["Baykan", "Eruh", "Kurtalan", "Merkez", "Pervari", "Şirvan", "Tillo"],
  "Sinop": ["Boyabat", "Dikmen", "Durağan", "Erfelek", "Gerze", "Merkez", "Saraydüzü", "Türkeli"],
  "Sivas": ["Akıncılar", "Altınyayla", "Divriği", "Doğanşar", "Gemerek", "Gölova", "Gürün", "Hafik", "İmranlı", "Kangal", "Koyulhisar", "Merkez", "Suşehri", "Şarkışla", "Ulaş", "Yıldızeli", "Zara"],
  "Tekirdağ": ["Çerkezköy", "Çorlu", "Ergene", "Hayrabolu", "Kapaklı", "Malkara", "Marmaraereğlisi", "Muratlı", "Saray", "Süleymanpaşa", "Şarköy"],
  "Tokat": ["Almus", "Artova", "Başçiftlik", "Erbaa", "Merkez", "Niksar", "Pazar", "Reşadiye", "Sulusaray", "Yeşilyurt", "Zile"],
  "Trabzon": ["Akçaabat", "Araklı", "Arsin", "Beşikdüzü", "Çarşıbaşı", "Çaykara", "Dernekpazarı", "Düzköy", "Hayrat", "Köprübaşı", "Maçka", "Of", "Ortahisar", "Sürmene", "Şalpazarı", "Tonya", "Vakfıkebir", "Yomra"],
  "Tunceli": ["Çemişgezek", "Hozat", "Mazgirt", "Nazımiye", "Ovacık", "Pertek", "Pülümür"],
  "Şanlıurfa": ["Akçakale", "Birecik", "Bozova", "Ceylanpınar", "Eyyübiye", "Halfeti", "Haliliye", "Harran", "Hilvan", "Karaköprü", "Siverek", "Suruç", "Viranşehir"],
  "Uşak": ["Banaz", "Eşme", "Karahallı", "Merkez", "Sivaslı", "Ulubey"],
  "Van": ["Bahçesaray", "Başkale", "Çaldıran", "Çatak", "Edremit", "Erciş", "Gevaş", "Gürpınar", "İpekyolu", "Muradiye", "Özalp", "Saray", "Tuşba"],
"Yozgat": ["Akdağmadeni", "Aydıncık", "Boğazlıyan", "Çandır", "Çayıralan", "Çekerek", "Kadışehri", "Merkez", "Saraykent", "Sarıkaya", "Sorgun", "Şefaatli", "Yenifakılı", "Yerköy"],
  "Zonguldak": ["Alaplı", "Çaycuma", "Devrek", "Gökçebey", "Karadeniz Ereğli", "Kilimli", "Kozlu", "Merkez"],
  "Aksaray": ["Ağaçören", "Eskil", "Gülağaç", "Güzelyurt", "Merkez", "Ortaköy", "Sarıyahşi", "Sultanhanı"],
  "Bayburt": ["Aydıntepe", "Demirözü", "Merkez"],
  "Karaman": ["Ayrancı", "Başyayla", "Ermenek", "Kazımkarabekir", "Merkez", "Sarıveliler"],
  "Kırıkkale": ["Bahşılı", "Balışeyh", "Çelebi", "Delice", "Karakeçili", "Keskin", "Merkez", "Sulakyurt", "Yahşihan"],
  "Batman": ["Beşiri", "Gercüş", "Hasankeyf", "Kozluk", "Merkez", "Sason"],
  "Şırnak": ["Beytüşşebap", "Cizre", "Güçlükonak", "İdil", "Merkez", "Silopi", "Uludere"],
  "Bartın": ["Amasra", "Kurucaşile", "Merkez", "Ulus"],
  "Ardahan": ["Çıldır", "Damal", "Göle", "Hanak", "Merkez", "Posof"],
  "Iğdır": ["Aralık", "Karakoyunlu", "Merkez", "Tuzluca"],
  "Yalova": ["Altınova", "Armutlu", "Çınarcık", "Çiftlikköy", "Merkez", "Termal"],
  "Karabük": ["Eflani", "Eskipazar", "Merkez", "Ovacık", "Safranbolu", "Yenice"],
  "Kilis": ["Elbeyli", "Merkez", "Musabeyli", "Polateli"],
  "Osmaniye": ["Bahçe", "Düziçi", "Hasanbeyli", "Kadirli", "Merkez", "Sumbas", "Toprakkale"],
  "Düzce": ["Akçakoca", "Cumayeri", "Çilimli", "Gölyaka", "Gümüşova", "Kaynaşlı", "Merkez", "Yığılca"]
};

// Initialize City Dropdowns on Load
function initCityDropdowns() {
  populateCitySelect("input-city-select");
  populateCitySelect("edit-city-select");
  populateCitySelect("auth-city");
}

// Handle City Select Change
function handleCityChange(city) {
  const districtSelect = document.getElementById("input-district-select");
  if (!districtSelect) return;

  if (!city || !TURKEY_CITIES[city]) {
    districtSelect.innerHTML = `<option value="">-- Önce Şehir Seçin --</option>`;
    return;
  }

  const districts = TURKEY_CITIES[city];
  districtSelect.innerHTML = districts.map(d => `<option value="${d}">${d}</option>`).join('');
}

// Handle Custom Machine Type Choice
function handleTypeChange(val) {
  const customInput = document.getElementById("input-custom-type");
  if (!customInput) return;
  if (val === "Diğer") {
    customInput.style.display = "block";
    customInput.required = true;
    customInput.focus();
  } else {
    customInput.style.display = "none";
    customInput.required = false;
    customInput.value = "";
  }
}

// Location Management State
const STORAGE_USER_LOCATION_KEY = "kepceburada_user_city_v1";
let userCurrentCity = "";

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  initCityDropdowns();
  initLocationCheck();
  renderUserBadge();
  renderListings();
  renderMyListings();
  renderRequests();
});

// Location Check & Modal Logic
function initLocationCheck() {
  const storedCity = localStorage.getItem(STORAGE_USER_LOCATION_KEY);
  const modalCitySelect = document.getElementById("modal-city-select");

  if (modalCitySelect) {
    const sortedCities = Object.keys(TURKEY_CITIES).sort((a, b) => a.localeCompare(b, 'tr'));
    modalCitySelect.innerHTML = `<option value="">-- Şehrinizi Seçiniz (81 İl) --</option>` + 
      sortedCities.map(city => `<option value="${city}">${city}</option>`).join('');
  }

  if (storedCity) {
    userCurrentCity = storedCity;
    updateUserLocationUI(storedCity);
    closeLocationModal();
  } else {
    openLocationModal();
  }
}

function openLocationModal() {
  const modal = document.getElementById("location-modal");
  if (modal) modal.classList.add("active");
}

function closeLocationModal() {
  const modal = document.getElementById("location-modal");
  if (modal) modal.classList.remove("active");
}

function updateUserLocationUI(city) {
  const nameEl = document.getElementById("current-location-name");
  if (nameEl) nameEl.textContent = city;
}

// Manual City Selection from Modal
function confirmManualLocation(city) {
  if (!city) return;
  userCurrentCity = city;
  localStorage.setItem(STORAGE_USER_LOCATION_KEY, city);
  updateUserLocationUI(city);
  closeLocationModal();
  showToast(`📍 Konumunuz "${city}" olarak ayarlandı.`);
  renderListings();
}

// GPS Location Detection
function detectGPSLocation() {
  const msgEl = document.getElementById("gps-status-msg");
  if (msgEl) msgEl.textContent = "⌛ Konumunuza erişiliyor...";

  if (window.AndroidNative && typeof window.AndroidNative.requestLocation === 'function') {
    window.AndroidNative.requestLocation();
    return;
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const city = "İstanbul";
        confirmManualLocation(city);
      },
      (error) => {
        if (msgEl) msgEl.textContent = "⚠️ GPS izni verilmedi. Lütfen aşağıdan şehrinizi seçiniz.";
      },
      { timeout: 8000 }
    );
  } else {
    if (msgEl) msgEl.textContent = "⚠️ Lütfen aşağıdan şehrinizi seçiniz.";
  }
}

// Load data from LocalStorage or initialize defaults
function loadData() {
  const storedListings = localStorage.getItem(STORAGE_LISTINGS_KEY);
  if (storedListings) {
    try {
      listings = JSON.parse(storedListings);
    } catch (e) {
      listings = DEFAULT_LISTINGS;
    }
  } else {
    listings = DEFAULT_LISTINGS;
    saveListings();
  }

  const storedRequests = localStorage.getItem(STORAGE_REQUESTS_KEY);
  if (storedRequests) {
    try {
      requests = JSON.parse(storedRequests);
    } catch (e) {
      requests = [];
    }
  } else {
    requests = [
      {
        id: "req-1",
        listingId: "kepce-1",
        machineryTitle: "CAT 320 Paletli Ekskavatör",
        clientName: "Mehmet Usta",
        clientPhone: "0555 444 33 22",
        duration: "5 gün - Şantiye temel kazısı",
        createdAt: new Date().toISOString()
      }
    ];
    saveRequests();
  }
}

function saveListings() {
  const dataStr = JSON.stringify(listings);
  localStorage.setItem(STORAGE_LISTINGS_KEY, dataStr);
  if (window.AndroidNative && typeof window.AndroidNative.saveListingsToNative === 'function') {
    window.AndroidNative.saveListingsToNative(dataStr);
  }
}

function restoreNativeListings(nativeData) {
  try {
    let parsed = null;
    if (typeof nativeData === 'string') {
      parsed = JSON.parse(nativeData);
    } else if (Array.isArray(nativeData)) {
      parsed = nativeData;
    }
    if (parsed && Array.isArray(parsed) && parsed.length > 0) {
      listings = parsed;
      localStorage.setItem(STORAGE_LISTINGS_KEY, JSON.stringify(listings));
      renderListings();
      renderMyListings();
    }
  } catch(e) {
    console.log("Error restoring native listings: ", e);
  }
}

function saveRequests() {
  localStorage.setItem(STORAGE_REQUESTS_KEY, JSON.stringify(requests));
}

// Dedicated Splash Screen Navigation
function enterMainApp(mode) {
  const splash = document.getElementById("splash-screen");
  const mainApp = document.getElementById("main-app-content");

  if (splash) splash.classList.remove("active");
  if (mainApp) mainApp.classList.add("active");

  if (mode === 'list' && (!currentUser || !currentUser.name)) {
    switchMode('rent');
    showToast("⚠️ İlan yayınlayabilmek için önce üye olmanız gerekmektedir.");
    openAuthModal();
    return;
  }

  switchMode(mode || 'rent');
  window.scrollTo(0, 0);
}

function returnToSplash() {
  const splash = document.getElementById("splash-screen");
  const mainApp = document.getElementById("main-app-content");

  if (mainApp) mainApp.classList.remove("active");
  if (splash) splash.classList.add("active");
  window.scrollTo(0, 0);
}

// Smooth Scroll to Search Section
function scrollToSearch() {
  switchMode('rent');
  const searchInput = document.getElementById("filter-search");
  if (searchInput) {
    searchInput.focus();
    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function quickFilterFromSplash(query) {
  enterMainApp('rent');
  setQuickCategory(query);
}

function detectGPSAndEnterMainApp() {
  enterMainApp('rent');
  detectGPSLocation();
}

// ==================== USER AUTHENTICATION & REGISTRATION ====================
let currentUser = null;
try {
  const storedUser = localStorage.getItem("makinebul_current_user");
  if (storedUser) currentUser = JSON.parse(storedUser);
} catch(e) {}

// Helper to safely populate city select
function populateCitySelect(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (typeof TURKEY_CITIES === 'object' && TURKEY_CITIES) {
    const sorted = Object.keys(TURKEY_CITIES).sort((a, b) => a.localeCompare(b, 'tr'));
    el.innerHTML = `<option value="">-- Şehir Seçiniz (81 İl) --</option>` + 
      sorted.map(c => `<option value="${c}">${c}</option>`).join('');
  }
}

// District Dropdown Helpers
function handleFastCityChange(city) {
  const districtEl = document.getElementById("fast-reg-district");
  if (!districtEl) return;
  const districts = TURKEY_CITIES[city] || ["Merkez"];
  districtEl.innerHTML = districts.map(d => `<option value="${d}">${d}</option>`).join('');
}

function handleMainRegCityChange(city) {
  const districtEl = document.getElementById("main-reg-district");
  if (!districtEl) return;
  const districts = TURKEY_CITIES[city] || ["Merkez"];
  districtEl.innerHTML = districts.map(d => `<option value="${d}">${d}</option>`).join('');
}

function handleAuthCityChange(city) {
  const districtEl = document.getElementById("auth-district");
  if (!districtEl) return;
  const districts = TURKEY_CITIES[city] || ["Merkez"];
  districtEl.innerHTML = districts.map(d => `<option value="${d}">${d}</option>`).join('');
}

let mainPendingAuthData = {};
let mainWizPhotoDataUrl = "";

function switchMainAuthTab(tab) {
  try {
    populateCitySelect("main-reg-city");
    const firstCity = document.getElementById("main-reg-city") ? document.getElementById("main-reg-city").value : "";
    if (firstCity) handleMainRegCityChange(firstCity);
  } catch(e) {}

  const wizTab = document.getElementById("main-tab-wiz");
  const loginTab = document.getElementById("main-tab-login");
  const wizContainer = document.getElementById("main-wiz-container");
  const loginContainer = document.getElementById("main-login-container");

  if (tab === 'login') {
    if (wizTab) wizTab.classList.remove("active");
    if (loginTab) loginTab.classList.add("active");
    if (wizContainer) wizContainer.style.display = "none";
    if (loginContainer) loginContainer.style.display = "block";
  } else {
    if (loginTab) loginTab.classList.remove("active");
    if (wizTab) wizTab.classList.add("active");
    if (loginContainer) loginContainer.style.display = "none";
    if (wizContainer) wizContainer.style.display = "block";
    backToMainWizStep1();
  }
}

function updateMainWizPills(stepNum) {
  for (let i = 1; i <= 3; i++) {
    const pill = document.getElementById(`main-step-pill-${i}`);
    if (!pill) continue;
    if (i === stepNum) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  }
}

function handleMainWizStep1(event) {
  event.preventDefault();
  const name = document.getElementById("main-reg-name").value.trim();
  const company = document.getElementById("main-reg-company") ? document.getElementById("main-reg-company").value.trim() : "";
  const password = document.getElementById("main-reg-password").value.trim();
  const phone = document.getElementById("main-reg-phone").value.trim();
  const city = document.getElementById("main-reg-city").value;
  const district = (document.getElementById("main-reg-district") ? document.getElementById("main-reg-district").value : "") || "Merkez";

  if (!name || !password || !phone || !city) {
    showToast("⚠️ Lütfen 1. Adımdaki tüm zorunlu alanları doldurunuz.");
    return;
  }

  mainPendingAuthData = { name, company, password, phone, city, district };

  document.getElementById("main-wiz-form-step1").style.display = "none";
  document.getElementById("main-wiz-form-step2").style.display = "block";
  document.getElementById("main-wiz-form-step3").style.display = "none";
  updateMainWizPills(2);

  const titleInput = document.getElementById("main-reg-title");
  if (titleInput && !titleInput.value) {
    const brandName = company || name;
    titleInput.value = `${brandName} - Kiralık Kepçe`;
  }
}

function backToMainWizStep1() {
  document.getElementById("main-wiz-form-step1").style.display = "block";
  document.getElementById("main-wiz-form-step2").style.display = "none";
  document.getElementById("main-wiz-form-step3").style.display = "none";
  updateMainWizPills(1);
}

function handleMainWizStep2(event) {
  event.preventDefault();
  const typeEl = document.getElementById("main-wiz-type") || document.getElementById("main-reg-type");
  let type = typeEl ? typeEl.value : "JCB Beko Loder Kepçe";
  const customInput = document.getElementById("main-wiz-custom-type");
  if ((type === 'Diğer' || type.includes('Farklı')) && customInput && customInput.value.trim()) {
    type = customInput.value.trim();
  }

  const title = (document.getElementById("main-wiz-title") || document.getElementById("main-reg-title")).value.trim();
  const hourlyPrice = parseFloat((document.getElementById("main-wiz-hourly") || document.getElementById("main-reg-hourly")).value) || 0;
  const dailyPrice = parseFloat((document.getElementById("main-wiz-daily") || document.getElementById("main-reg-daily")).value) || 0;

  if (!title || !hourlyPrice || !dailyPrice) {
    showToast("⚠️ Lütfen 2. Adımdaki makine ve ücret bilgilerini doldurunuz.");
    return;
  }

  mainPendingAuthData.type = type;
  mainPendingAuthData.title = title;
  mainPendingAuthData.hourlyPrice = hourlyPrice;
  mainPendingAuthData.dailyPrice = dailyPrice;

  document.getElementById("main-wiz-form-step1").style.display = "none";
  document.getElementById("main-wiz-form-step2").style.display = "none";
  document.getElementById("main-wiz-form-step3").style.display = "block";
  updateMainWizPills(3);
}

function backToMainWizStep2() {
  document.getElementById("main-wiz-form-step1").style.display = "none";
  document.getElementById("main-wiz-form-step2").style.display = "block";
  document.getElementById("main-wiz-form-step3").style.display = "none";
  updateMainWizPills(2);
}

function triggerMainWizPhotoUpload(e) {
  if (e && e.target && e.target.closest && e.target.closest('.btn-3d-remove-photo')) return;
  const input = document.getElementById("main-wiz-file");
  if (input) {
    input.click();
  }
}

function previewMainWizImage(event) {
  previewMainWizPhoto(event);
}

function previewMainWizPhoto(event) {
  const file = event.target && event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onerror = function() {
    showToast("⚠️ Fotoğraf okunamadı, lütfen tekrar deneyin.");
  };
  reader.onload = function(e) {
    const rawDataUrl = e.target.result;
    
    // Quick apply to ensure preview immediately appears
    mainWizPhotoDataUrl = rawDataUrl;
    const promptBox = document.getElementById("main-wiz-prompt");
    const container = document.getElementById("main-wiz-preview-box");
    const imgEl = document.getElementById("main-wiz-preview-img");

    if (imgEl) imgEl.src = rawDataUrl;
    if (promptBox) promptBox.style.display = "none";
    if (container) container.style.display = "flex";
    showToast("📸 Kepçe fotoğrafı yüklendi!");

    // Also attempt optimized compression in background
    try {
      const img = new Image();
      img.onload = function() {
        try {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 800;
          if (width > height) {
            if (width > MAX_SIZE) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          mainWizPhotoDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          if (imgEl) imgEl.src = mainWizPhotoDataUrl;
        } catch(cErr) {
          // Keep rawDataUrl
        }
      };
      img.src = rawDataUrl;
    } catch(err) {
      // Keep rawDataUrl
    }
  };
  reader.readAsDataURL(file);
}

function removeMainWizPhoto(event) {
  if (event) event.stopPropagation();
  mainWizPhotoDataUrl = "";
  const fileInput = document.getElementById("main-wiz-file");
  if (fileInput) fileInput.value = "";
  const promptBox = document.getElementById("main-wiz-prompt");
  const container = document.getElementById("main-wiz-preview-box");
  const imgEl = document.getElementById("main-wiz-preview-img");
  if (imgEl) imgEl.src = "";
  if (promptBox) promptBox.style.display = "block";
  if (container) container.style.display = "none";
}

function completeMainWizardListing(event) {
  handleMainWizStep3(event);
}

function handleMainWizStep3(event) {
  if (event) event.preventDefault();

  if (!mainPendingAuthData) {
    mainPendingAuthData = {
      name: "Makine Sahibi",
      company: "",
      phone: "0532 000 00 00",
      city: userCurrentCity || "İstanbul",
      password: "123",
      type: "Beko Loder (JCB)",
      title: "Kiralık Beko Loder",
      hourlyPrice: 1500,
      dailyPrice: 10000
    };
  }

  const name = mainPendingAuthData.name || "Makine Sahibi";
  const company = mainPendingAuthData.company || "";
  const displayName = company ? `${name} (${company})` : name;

  // 1. Create User Account
  currentUser = {
    name: name,
    company: company,
    displayName: displayName,
    phone: mainPendingAuthData.phone || "",
    city: mainPendingAuthData.city || userCurrentCity || "İstanbul",
    password: mainPendingAuthData.password || "123",
    verifiedCode: "213091",
    createdAt: new Date().toISOString()
  };

  localStorage.setItem("makinebul_current_user", JSON.stringify(currentUser));

  // 2. Select Machine Image
  let image = mainWizPhotoDataUrl;
  if (!image) {
    const machineType = mainPendingAuthData.type || "Beko Loder (JCB)";
    image = machineType.includes("Beko") || machineType.includes("JCB")
      ? "assets/backhoe_loader.png" 
      : machineType.includes("Mini") 
      ? "assets/mini_excavator.png" 
      : machineType.includes("Bobcat")
      ? "assets/bobcat.png"
      : machineType.includes("Manitou")
      ? "assets/manitou.png"
      : machineType.includes("Kamyon")
      ? "assets/dump_truck.png"
      : "assets/excavator1.png";
  }

  // 3. Create Listing
  const newListing = {
    id: "kepce-" + Date.now(),
    title: mainPendingAuthData.title || "Kiralık İş Makinesi",
    type: mainPendingAuthData.type || "Beko Loder (JCB)",
    city: mainPendingAuthData.city || userCurrentCity || "İstanbul",
    district: mainPendingAuthData.district || "Merkez",
    price: mainPendingAuthData.dailyPrice || 10000,
    hourlyPrice: mainPendingAuthData.hourlyPrice || 1500,
    period: "Günlük",
    operator: "Operatörlü",
    specs: "Kiralık İş Makinesi",
    phone: mainPendingAuthData.phone || "0532 000 00 00",
    owner: displayName,
    image: image,
    status: "available",
    isMyListing: true,
    createdAt: new Date().toISOString()
  };

  listings.unshift(newListing);
  saveListings();

  // Reset Photo Preview
  mainWizPhotoDataUrl = "";

  backToMainWizStep1();
  renderUserBadge();
  renderListings();
  renderMyListings();

  showToast("🎉 Üyeliğiniz oluşturuldu ve kepçe ilanınız başarıyla yayınlandı!");

  enterMainApp('rent');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showForgotPasswordForm() {
  const loginForm = document.getElementById("main-quick-login-form");
  const forgotForm = document.getElementById("main-forgot-password-form");
  if (loginForm) loginForm.style.display = "none";
  if (forgotForm) forgotForm.style.display = "block";
}

function hideForgotPasswordForm() {
  const loginForm = document.getElementById("main-quick-login-form");
  const forgotForm = document.getElementById("main-forgot-password-form");
  if (loginForm) loginForm.style.display = "block";
  if (forgotForm) forgotForm.style.display = "none";
}

function showModalForgotPasswordForm() {
  const loginForm = document.getElementById("auth-login-form");
  const forgotForm = document.getElementById("modal-forgot-password-form");
  if (loginForm) loginForm.style.display = "none";
  if (forgotForm) forgotForm.style.display = "block";
}

function hideModalForgotPasswordForm() {
  const loginForm = document.getElementById("auth-login-form");
  const forgotForm = document.getElementById("modal-forgot-password-form");
  if (loginForm) loginForm.style.display = "block";
  if (forgotForm) forgotForm.style.display = "none";
}

function handleResetPassword(event) {
  if (event) event.preventDefault();
  const phoneEl = document.getElementById("reset-phone") || document.getElementById("modal-reset-phone");
  const newPassEl = document.getElementById("reset-new-password") || document.getElementById("modal-reset-new-password");

  const phone = phoneEl ? phoneEl.value.trim() : "";
  const newPass = newPassEl ? newPassEl.value.trim() : "";

  if (!phone || !newPass) {
    showToast("⚠️ Lütfen telefon numaranızı ve yeni şifrenizi giriniz.");
    return;
  }

  const cleanPhone = phone.replace(/\D/g, '');
  
  let user = null;
  const storedUser = localStorage.getItem("makinebul_current_user");
  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch(e) {}
  }

  if (!user) {
    const userListing = listings.find(i => i.phone && i.phone.replace(/\D/g, '').endsWith(cleanPhone.slice(-7)));
    const ownerName = userListing ? userListing.owner : "Yakup Kartal (Bey Hafriyat)";
    user = {
      name: ownerName,
      displayName: ownerName,
      company: "Bey Hafriyat",
      phone: phone,
      city: userListing ? userListing.city : "Bingöl",
      createdAt: new Date().toISOString()
    };
  }

  user.password = newPass;
  user.phone = phone;
  currentUser = user;
  localStorage.setItem("makinebul_current_user", JSON.stringify(currentUser));

  showToast("🎉 Şifreniz başarıyla yenilendi ve giriş yapıldı!");
  
  hideForgotPasswordForm();
  hideModalForgotPasswordForm();
  closeAuthModal();
  updateLoggedInDashboardUI();
  renderUserBadge();
  renderListings();
  renderMyListings();
  switchMode('list');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Clean Phone Formatter
function formatCleanPhoneNumber(phone) {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0,4)} ${cleaned.slice(4,7)} ${cleaned.slice(7,9)} ${cleaned.slice(9,11)}`;
  } else if (cleaned.length === 10) {
    return `0${cleaned.slice(0,3)} ${cleaned.slice(3,6)} ${cleaned.slice(6,8)} ${cleaned.slice(8,10)}`;
  }
  return phone;
}

// User Badge & Header Profile Controller
function renderUserBadge() {
  const badge = document.getElementById("header-user-badge");
  const userNameEl = document.getElementById("header-user-name");
  const authModalBtn = document.getElementById("btn-open-auth-modal");
  
  if (currentUser && currentUser.name) {
    if (badge) badge.style.display = "flex";
    if (userNameEl) userNameEl.textContent = currentUser.name;
    if (authModalBtn) authModalBtn.style.display = "none";
  } else {
    if (badge) badge.style.display = "none";
    if (authModalBtn) authModalBtn.style.display = "inline-flex";
  }
}

function handleMainQuickLogin(event) {
  if (event) event.preventDefault();
  const phone = document.getElementById("main-login-phone").value.trim();
  const password = document.getElementById("main-login-password") ? document.getElementById("main-login-password").value.trim() : "";

  if (!phone) {
    showToast("⚠️ Lütfen telefon numaranızı giriniz.");
    return;
  }

  // Restore saved user if found, or create logged-in user profile
  let foundUser = null;
  try {
    const saved = localStorage.getItem("makinebul_current_user");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.name) foundUser = parsed;
    }
  } catch(e) {}

  if (foundUser) {
    currentUser = foundUser;
    if (phone) currentUser.phone = phone;
    if (password) currentUser.password = password;
  } else {
    currentUser = {
      name: "Yakup Kartal",
      company: "Bey Hafriyat",
      displayName: "Yakup Kartal (Bey Hafriyat)",
      phone: phone,
      city: userCurrentCity || "Bingöl",
      password: password,
      verifiedCode: "213091",
      createdAt: new Date().toISOString()
    };
  }

  localStorage.setItem("makinebul_current_user", JSON.stringify(currentUser));

  try { renderUserBadge(); } catch(e) {}
  try { updateLoggedInDashboardUI(); } catch(e) {}
  try { renderMyListings(); } catch(e) {}
  try { renderListings(); } catch(e) {}

  showToast("🎉 Giriş başarılı! Hoş geldiniz, " + currentUser.name);

  // Switch to list view so user immediately sees their account dashboard and listings!
  switchMode('list');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openAuthModal() {
  if (currentUser) {
    switchMode('list');
    switchDashboardTab('add');
    return;
  }

  try {
    populateCitySelect("auth-city");
    const firstCity = document.getElementById("auth-city") ? document.getElementById("auth-city").value : "";
    if (firstCity) handleAuthCityChange(firstCity);
  } catch(e) {
    console.log("Error populating auth city:", e);
  }
  
  const modal = document.getElementById("auth-modal");
  if (!modal) return;
  
  switchAuthTab('register');

  modal.style.display = "flex";
  modal.style.zIndex = "999999";
  modal.classList.add("active");
}

function switchAuthTab(tab) {
  const regBtn = document.getElementById("auth-tab-register");
  const loginBtn = document.getElementById("auth-tab-login");
  const loginForm = document.getElementById("auth-login-form");
  const wizBar = document.getElementById("wizard-steps-bar");
  const step1 = document.getElementById("auth-form-step1");
  const step2 = document.getElementById("auth-form-step2");
  const step3 = document.getElementById("auth-form-step3");

  if (tab === 'login') {
    if (regBtn) {
      regBtn.style.background = "transparent";
      regBtn.style.border = "1px solid transparent";
      regBtn.style.color = "#94A3B8";
    }
    if (loginBtn) {
      loginBtn.style.background = "rgba(245,158,11,0.25)";
      loginBtn.style.border = "1px solid #F59E0B";
      loginBtn.style.color = "#F59E0B";
    }
    if (loginForm) loginForm.style.display = "block";
    if (wizBar) wizBar.style.display = "none";
    if (step1) step1.style.display = "none";
    if (step2) step2.style.display = "none";
    if (step3) step3.style.display = "none";
  } else {
    if (loginBtn) {
      loginBtn.style.background = "transparent";
      loginBtn.style.border = "1px solid transparent";
      loginBtn.style.color = "#94A3B8";
    }
    if (regBtn) {
      regBtn.style.background = "rgba(245,158,11,0.25)";
      regBtn.style.border = "1px solid #F59E0B";
      regBtn.style.color = "#F59E0B";
    }
    if (loginForm) loginForm.style.display = "none";
    if (wizBar) wizBar.style.display = "flex";
    backToWizardStep1();
  }
}

function handleQuickLogin(event) {
  event.preventDefault();
  const phone = document.getElementById("login-phone").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!phone || !password) {
    showToast("⚠️ Lütfen telefon numaranızı ve şifrenizi giriniz.");
    return;
  }

  currentUser = {
    name: "Yakup Kartal",
    company: "Bey Hafriyat",
    displayName: "Yakup Kartal (Bey Hafriyat)",
    phone: phone,
    city: "Bingöl",
    password: password,
    verifiedCode: "213091",
    createdAt: new Date().toISOString()
  };

  localStorage.setItem("makinebul_current_user", JSON.stringify(currentUser));

  closeAuthModal();
  try { renderUserBadge(); } catch(e) {}
  try { updateLoggedInDashboardUI(); } catch(e) {}
  try { renderMyListings(); } catch(e) {}
  try { renderListings(); } catch(e) {}
  
  showToast("🎉 Giriş başarılı! Hoş geldiniz, " + currentUser.name);

  enterMainApp('rent');
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.remove("active");
  }
}

let pendingAuthData = {};
let wizPhotoDataUrl = "";

function triggerWizPhotoUpload(e) {
  if (e && e.target && e.target.closest && e.target.closest('.btn-3d-remove-photo')) return;
  const input = document.getElementById("wiz-photo-file");
  if (input) {
    input.click();
  }
}

function removeWizPhoto(event) {
  if (event) event.stopPropagation();
  wizPhotoDataUrl = "";
  const fileInput = document.getElementById("wiz-photo-file");
  if (fileInput) fileInput.value = "";
  const promptBox = document.getElementById("wiz-dropzone-prompt");
  const container = document.getElementById("wiz-image-preview-container");
  const imgEl = document.getElementById("wiz-image-preview-img");
  if (imgEl) imgEl.src = "";
  if (promptBox) promptBox.style.display = "flex";
  if (container) container.style.display = "none";
}

function previewWizPhoto(event) {
  const file = event.target && event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onerror = function() {
    showToast("⚠️ Fotoğraf okunamadı, lütfen tekrar deneyin.");
  };
  reader.onload = function(e) {
    const rawDataUrl = e.target.result;
    wizPhotoDataUrl = rawDataUrl;

    const promptBox = document.getElementById("wiz-dropzone-prompt");
    const container = document.getElementById("wiz-image-preview-container");
    const imgEl = document.getElementById("wiz-image-preview-img");

    if (imgEl) imgEl.src = rawDataUrl;
    if (promptBox) promptBox.style.display = "none";
    if (container) container.style.display = "flex";
    showToast("📸 Kepçe fotoğrafı yüklendi!");

    try {
      const img = new Image();
      img.onload = function() {
        try {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 800;
          if (width > height) {
            if (width > MAX_SIZE) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          wizPhotoDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          if (imgEl) imgEl.src = wizPhotoDataUrl;
        } catch(cErr) {}
      };
      img.src = rawDataUrl;
    } catch(err) {}
  };
  reader.readAsDataURL(file);
}

function updateWizardPills(stepNum) {
  for (let i = 1; i <= 3; i++) {
    const pill = document.getElementById(`wiz-step-pill-${i}`);
    if (!pill) continue;
    if (i === stepNum) {
      pill.style.color = "#F59E0B";
      pill.style.background = "rgba(245,158,11,0.2)";
      pill.style.border = "1px solid rgba(245,158,11,0.4)";
    } else {
      pill.style.color = "#64748B";
      pill.style.background = "transparent";
      pill.style.border = "none";
    }
  }
}

function goToWizardStep2(event) {
  event.preventDefault();
  const name = document.getElementById("auth-name").value.trim();
  const company = document.getElementById("auth-company") ? document.getElementById("auth-company").value.trim() : "";
  const password = document.getElementById("auth-password").value.trim();
  const phone = document.getElementById("auth-phone").value.trim();
  const city = document.getElementById("auth-city").value;
  const district = (document.getElementById("auth-district") ? document.getElementById("auth-district").value : "") || "Merkez";

  if (!name || !password || !phone || !city) {
    showToast("⚠️ Lütfen 1. Adımdaki tüm zorunlu alanları doldurunuz.");
    return;
  }

  pendingAuthData = { name, company, password, phone, city, district };

  document.getElementById("auth-form-step1").style.display = "none";
  document.getElementById("auth-form-step2").style.display = "block";
  document.getElementById("auth-form-step3").style.display = "none";
  updateWizardPills(2);

  // Pre-fill listing title
  const titleInput = document.getElementById("wiz-listing-title");
  if (titleInput && !titleInput.value) {
    const brandName = company || name;
    titleInput.value = `${brandName} - Kiralık Kepçe`;
  }
}

function backToWizardStep1() {
  document.getElementById("auth-form-step1").style.display = "block";
  document.getElementById("auth-form-step2").style.display = "none";
  document.getElementById("auth-form-step3").style.display = "none";
  updateWizardPills(1);
}

function goToWizardStep3(event) {
  event.preventDefault();
  let type = document.getElementById("wiz-machine-type").value;
  const customInput = document.getElementById("modal-wiz-custom-type");
  if ((type === 'Diğer' || type.includes('Farklı')) && customInput && customInput.value.trim()) {
    type = customInput.value.trim();
  }

  const title = document.getElementById("wiz-listing-title").value.trim();
  const hourlyPrice = parseFloat(document.getElementById("wiz-hourly-price").value) || 0;
  const dailyPrice = parseFloat(document.getElementById("wiz-daily-price").value) || 0;

  if (!title || !hourlyPrice || !dailyPrice) {
    showToast("⚠️ Lütfen 2. Adımdaki makine ve ücret bilgilerini doldurunuz.");
    return;
  }

  pendingAuthData.type = type;
  pendingAuthData.title = title;
  pendingAuthData.hourlyPrice = hourlyPrice;
  pendingAuthData.dailyPrice = dailyPrice;

  document.getElementById("auth-form-step1").style.display = "none";
  document.getElementById("auth-form-step2").style.display = "none";
  document.getElementById("auth-form-step3").style.display = "block";
  updateWizardPills(3);
}

function backToWizardStep2() {
  document.getElementById("auth-form-step1").style.display = "none";
  document.getElementById("auth-form-step2").style.display = "block";
  document.getElementById("auth-form-step3").style.display = "none";
  updateWizardPills(2);
}

function completeWizardListing(event) {
  event.preventDefault();

  const displayName = pendingAuthData.company 
    ? `${pendingAuthData.name} (${pendingAuthData.company})`
    : pendingAuthData.name;

  // 1. Create User Account
  currentUser = {
    name: pendingAuthData.name,
    company: pendingAuthData.company || "",
    displayName: displayName,
    phone: pendingAuthData.phone,
    city: pendingAuthData.city,
    password: pendingAuthData.password,
    verifiedCode: "213091",
    createdAt: new Date().toISOString()
  };

  localStorage.setItem("makinebul_current_user", JSON.stringify(currentUser));

  // 2. Select Machine Image
  let image = wizPhotoDataUrl;
  if (!image) {
    image = pendingAuthData.type === "Beko Loder (JCB)" || pendingAuthData.type === "JCB Beko Loder Kepçe"
      ? "assets/backhoe_loader.png" 
      : pendingAuthData.type === "Mini Ekskavatör / Kepçe" 
      ? "assets/mini_excavator.png" 
      : pendingAuthData.type === "Bobcat Mini Yükleyici"
      ? "assets/bobcat.png"
      : pendingAuthData.type === "Manitou Telehandler"
      ? "assets/manitou.png"
      : pendingAuthData.type === "Hafriyat Kamyonu"
      ? "assets/dump_truck.png"
      : "assets/excavator1.png";
  }

  // 3. Create Listing
  const newListing = {
    id: "kepce-" + Date.now(),
    title: pendingAuthData.title,
    type: pendingAuthData.type,
    city: pendingAuthData.city,
    district: pendingAuthData.district || "Merkez",
    price: pendingAuthData.dailyPrice,
    hourlyPrice: pendingAuthData.hourlyPrice,
    period: "Günlük",
    operator: "Operatörlü",
    specs: "Kiralık İş Makinesi",
    phone: pendingAuthData.phone,
    owner: displayName,
    image: image,
    status: "available",
    isMyListing: true,
    createdAt: new Date().toISOString()
  };

  listings.unshift(newListing);
  saveListings();

  closeAuthModal();
  backToWizardStep1();

  renderUserBadge();
  renderListings();

  showToast("🎉 Üyeliğiniz oluşturuldu ve kepçe ilanınız başarıyla yayınlandı!");

  enterMainApp('rent');
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem("makinebul_current_user");
  renderUserBadge();
  updateLoggedInDashboardUI();
  renderListings();
  renderMyListings();
  showToast("🚪 Hesabınızdan başarıyla çıkış yapıldı.");
  switchMode('list');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleUserMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById("user-dropdown-menu");
  if (!menu) return;
  const isHidden = menu.style.display === "none" || !menu.style.display;
  menu.style.display = isHidden ? "block" : "none";
}

document.addEventListener("click", () => {
  const menu = document.getElementById("user-dropdown-menu");
  if (menu) menu.style.display = "none";
});

function goToMyListings() {
  switchMode('list');
  switchDashboardTab('listings');
}

function openFastAddListingModal() {
  switchMode('list');
  switchDashboardTab('add');
}

function switchDashboardTab(tab) {
  const listingsView = document.getElementById("dash-view-listings");
  const addView = document.getElementById("dash-view-add");
  const btnListings = document.getElementById("tab-btn-dash-listings");
  const btnAdd = document.getElementById("tab-btn-dash-add");

  if (tab === 'add') {
    if (listingsView) listingsView.style.display = "none";
    if (addView) addView.style.display = "block";
    if (btnListings) {
      btnListings.style.background = "transparent";
      btnListings.style.color = "#94A3B8";
      btnListings.style.boxShadow = "none";
      btnListings.style.fontWeight = "700";
    }
    if (btnAdd) {
      btnAdd.style.background = "linear-gradient(135deg, #F59E0B, #D97706)";
      btnAdd.style.color = "#0F172A";
      btnAdd.style.boxShadow = "0 4px 15px rgba(245,158,11,0.35)";
      btnAdd.style.fontWeight = "800";
    }
    try { populateCitySelect("fast-reg-city"); } catch(e) {}
  } else {
    if (addView) addView.style.display = "none";
    if (listingsView) listingsView.style.display = "block";
    if (btnAdd) {
      btnAdd.style.background = "transparent";
      btnAdd.style.color = "#94A3B8";
      btnAdd.style.boxShadow = "none";
      btnAdd.style.fontWeight = "700";
    }
    if (btnListings) {
      btnListings.style.background = "linear-gradient(135deg, #F59E0B, #D97706)";
      btnListings.style.color = "#0F172A";
      btnListings.style.boxShadow = "0 4px 15px rgba(245,158,11,0.35)";
      btnListings.style.fontWeight = "800";
    }
    renderMyListings();
  }
}

// Logged In Dashboard UI Controller
function updateLoggedInDashboardUI() {
  const dashContainer = document.getElementById("logged-in-user-dashboard");
  const anonAuthSection = document.getElementById("anon-auth-section");

  try {
    populateCitySelect("fast-reg-city");
    if (currentUser && currentUser.city) {
      const citySelect = document.getElementById("fast-reg-city");
      if (citySelect) {
        citySelect.value = currentUser.city;
        handleFastCityChange(currentUser.city);
      }
    } else {
      const firstCity = document.getElementById("fast-reg-city") ? document.getElementById("fast-reg-city").value : "";
      if (firstCity) handleFastCityChange(firstCity);
    }
  } catch(e) {}

  if (currentUser && currentUser.name) {
    if (dashContainer) dashContainer.style.display = "block";
    if (anonAuthSection) anonAuthSection.style.display = "none";

    const nameEl = document.getElementById("dash-user-name");
    const subEl = document.getElementById("dash-user-sub");
    const statListingsEl = document.getElementById("dash-stat-my-listings");

    if (nameEl) nameEl.textContent = `${currentUser.displayName || currentUser.name}`;
    if (subEl) {
      const cleanPhone = formatCleanPhoneNumber(currentUser.phone);
      subEl.innerHTML = `📞 Telefon: <strong style="color: #FCD34D;">${cleanPhone || 'Girilmedi'}</strong> | 📍 Şehir: <strong style="color: #fff;">${currentUser.city || '81 İl'}</strong>`;
    }
    
    if (statListingsEl) {
      const myList = getMyListings();
      statListingsEl.textContent = `${myList.length}`;
    }

    switchDashboardTab('listings');
  } else {
    if (dashContainer) dashContainer.style.display = "none";
    if (anonAuthSection) anonAuthSection.style.display = "block";
    switchMainAuthTab('wizard');
  }
}

// Dynamic Machine Type Dropdown Change Handler
function handleMachineTypeChange(selectId, customInputId) {
  const select = document.getElementById(selectId);
  const customInput = document.getElementById(customInputId);
  if (!select || !customInput) return;
  if (select.value === 'Diğer' || select.value.includes('Farklı')) {
    customInput.style.display = 'block';
    customInput.required = true;
    customInput.focus();
  } else {
    customInput.style.display = 'none';
    customInput.required = false;
    customInput.value = '';
  }
}

let fastUploadedImageDataUrl = "";

function triggerFastPhotoUpload(e) {
  if (e && e.target && e.target.closest && e.target.closest('.btn-3d-secondary')) return;
  const input = document.getElementById("fast-photo-file");
  if (input) input.click();
}

function previewFastPhotoImage(event) {
  const file = event.target && event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      const MAX_SIZE = 800;
      if (width > height) {
        if (width > MAX_SIZE) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      fastUploadedImageDataUrl = canvas.toDataURL("image/jpeg", 0.85);

      const promptBox = document.getElementById("fast-photo-prompt");
      const previewBox = document.getElementById("fast-photo-preview-box");
      const imgEl = document.getElementById("fast-photo-preview-img");

      if (imgEl) imgEl.src = fastUploadedImageDataUrl;
      if (promptBox) promptBox.style.display = "none";
      if (previewBox) previewBox.style.display = "block";
      showToast("📸 Makine fotoğrafı başarıyla yüklendi!");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeFastPhoto(event) {
  if (event) event.stopPropagation();
  fastUploadedImageDataUrl = "";
  const fileInput = document.getElementById("fast-photo-file");
  if (fileInput) fileInput.value = "";
  const promptBox = document.getElementById("fast-photo-prompt");
  const previewBox = document.getElementById("fast-photo-preview-box");
  const imgEl = document.getElementById("fast-photo-preview-img");
  if (imgEl) imgEl.src = "";
  if (promptBox) promptBox.style.display = "block";
  if (previewBox) previewBox.style.display = "none";
}

function handleFastAddListing(event) {
  if (event) event.preventDefault();

  if (!currentUser) {
    showToast("⚠️ İlan eklemek için lütfen giriş yapınız.");
    return;
  }

  let type = document.getElementById("fast-reg-type").value;
  const customTypeInput = document.getElementById("fast-custom-type");
  if ((type === 'Diğer' || type.includes('Farklı')) && customTypeInput && customTypeInput.value.trim()) {
    type = customTypeInput.value.trim();
  }

  const title = document.getElementById("fast-reg-title").value.trim();
  const city = document.getElementById("fast-reg-city").value || currentUser.city || userCurrentCity || "İstanbul";
  const district = (document.getElementById("fast-reg-district") ? document.getElementById("fast-reg-district").value : "") || "Merkez";
  const hourlyPrice = parseFloat(document.getElementById("fast-reg-hourly").value) || 1500;
  const dailyPrice = parseFloat(document.getElementById("fast-reg-daily").value) || 10000;

  if (!title) {
    showToast("⚠️ Lütfen ilan başlığını giriniz.");
    return;
  }

  let image = fastUploadedImageDataUrl || (
    type.toLowerCase().includes("beko") || type.toLowerCase().includes("jcb")
      ? "assets/backhoe_loader.png" 
      : type.toLowerCase().includes("mini") 
      ? "assets/mini_excavator.png" 
      : type.toLowerCase().includes("bobcat")
      ? "assets/bobcat.png"
      : type.toLowerCase().includes("manitou")
      ? "assets/manitou.png"
      : type.toLowerCase().includes("kamyon")
      ? "assets/dump_truck.png"
      : "assets/excavator1.png"
  );

  const newListing = {
    id: "kepce-" + Date.now(),
    title: title,
    type: type,
    city: city,
    district: district,
    price: dailyPrice,
    hourlyPrice: hourlyPrice,
    period: "Günlük",
    operator: "Operatörlü",
    specs: "Kiralık İş Makinesi",
    phone: currentUser.phone || "0532 000 00 00",
    owner: currentUser.displayName || currentUser.name || "Makine Sahibi",
    image: image,
    status: "available",
    isMyListing: true,
    createdAt: new Date().toISOString()
  };

  listings.unshift(newListing);
  saveListings();

  document.getElementById("fast-reg-title").value = "";
  if (customTypeInput) {
    customTypeInput.value = "";
    customTypeInput.style.display = "none";
  }
  document.getElementById("fast-reg-type").value = "JCB Beko Loder Kepçe";
  removeFastPhoto();

  renderListings();
  renderMyListings();

  showToast("🎉 Yeni kepçe ilanınız başarıyla yayınlandı!");

  switchDashboardTab('listings');
}

// Mode Switcher (Kirala vs Kiralat)
function switchMode(mode) {
  activeMode = mode;
  const rentView = document.getElementById("rent-view");
  const listView = document.getElementById("list-view");
  const btnRent = document.getElementById("btn-mode-rent");
  const btnList = document.getElementById("btn-mode-list");

  if (mode === "rent") {
    rentView.classList.add("active");
    listView.classList.remove("active");
    btnRent.classList.add("active");
    btnList.classList.remove("active");
    renderListings();
  } else {
    listView.classList.add("active");
    rentView.classList.remove("active");
    btnList.classList.add("active");
    btnRent.classList.remove("active");
    
    updateLoggedInDashboardUI();
    renderMyListings();
    renderRequests();
  }
}

// Region Neighbor Cities Map
const NEARBY_CITIES_MAP = {
  "Bingöl": ["Bingöl", "Elazığ", "Muş", "Erzurum", "Diyarbakır", "Erzincan"],
  "Elazığ": ["Elazığ", "Bingöl", "Malatya", "Diyarbakır", "Tunceli"],
  "Diyarbakır": ["Diyarbakır", "Bingöl", "Elazığ", "Mardin", "Batman", "Şanlıurfa"],
  "Erzurum": ["Erzurum", "Bingöl", "Erzincan", "Kars", "Ağrı", "Rize"],
  "İstanbul": ["İstanbul", "Kocaeli", "Tekirdağ", "Yalova", "Bursa"],
  "Ankara": ["Ankara", "Kırıkkale", "Çankırı", "Bolu", "Eskişehir", "Konya"],
  "İzmir": ["İzmir", "Manisa", "Aydın", "Balıkesir"],
  "Bursa": ["Bursa", "Yalova", "Kocaeli", "Balıkesir"],
  "Antalya": ["Antalya", "Isparta", "Burdur", "Muğla"]
};

// Render Listings for Rent View - Ultra Simple Cards with Strict Location Filtering
function renderListings() {
  const grid = document.getElementById("listings-grid");
  const searchInput = (document.getElementById("filter-search").value || "").toLowerCase().trim();

  // 1. Base filter by search text
  let filtered = listings.filter(item => {
    if (!searchInput) return true;
    const query = searchInput.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.city.toLowerCase().includes(query) ||
      item.district.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.operator.toLowerCase().includes(query)
    );
  });

  // 2. Location Filtering: User's own listings ALWAYS pass through!
  if (userCurrentCity && !searchInput) {
    const allowedCities = NEARBY_CITIES_MAP[userCurrentCity] || [userCurrentCity];
    filtered = filtered.filter(item => {
      if (isItemMine(item)) return true; // User's own listing is ALWAYS shown!
      return allowedCities.some(city => item.city.toLowerCase().includes(city.toLowerCase()));
    });
  }

  // 3. Sort listings: User's own listings FIRST, then user's city machines!
  filtered.sort((a, b) => {
    const aMine = isItemMine(a);
    const bMine = isItemMine(b);
    if (aMine && !bMine) return -1;
    if (!aMine && bMine) return 1;
    if (userCurrentCity) {
      const aMatches = a.city.toLowerCase() === userCurrentCity.toLowerCase();
      const bMatches = b.city.toLowerCase() === userCurrentCity.toLowerCase();
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
    }
    return 0;
  });

  // Update header text to reassure user about their location
  const countEl = document.getElementById("results-count") || document.getElementById("results-title-text");
  if (countEl) {
    if (userCurrentCity) {
      countEl.textContent = `📍 ${userCurrentCity} ve Çevresindeki Makineler (${filtered.length})`;
    } else {
      countEl.textContent = `Türkiye Genelindeki Tüm Makineler (${filtered.length})`;
    }
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1.25rem; background: var(--bg-card); border: 1.5px solid var(--border-color); border-radius: 16px; color: var(--text-main); box-shadow: var(--card-shadow);" class="card empty-results-card">
        <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--text-heading); margin-bottom: 0.5rem;">🔍 Aradığınız Kriterlere Uygun Makine Bulunamadı</h3>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.25rem;">Farklı bir şehir arayabilir veya tüm Türkiye makinelerini gösterebilirsiniz.</p>
        <button class="btn-3d-gold-action" style="max-width: 280px; margin: 0 auto; padding: 0.75rem 1.25rem; font-size: 0.88rem;" onclick="showAllTurkey()">🇹🇷 Tüm İlanları Göster</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const cleanPhone = item.phone.replace(/\D/g, '');
    const isAvailable = item.status === 'available';
    const statusClass = isAvailable ? 'available' : 'rented';
    const statusText = isAvailable ? '🟢 Müsait' : '🔴 Kirada';
    const hourlyPriceNum = item.hourlyPrice || Math.round(item.price / 8);
    const isMine = isItemMine(item);

    return `
      <div class="card card-listing-sahibinden">
        <!-- Top Image Container -->
        <div class="sahibinden-img-box">
          <img src="${item.image}" alt="${item.title}" onerror="this.src='assets/excavator1.png'">
          <span class="card-status-badge ${statusClass}">${statusText}</span>
        </div>
        
        <!-- Middle Details Container -->
        <div class="sahibinden-details-box">
          <h3 class="sahibinden-title">${item.title}</h3>
          
          <div class="sahibinden-owner-name" style="font-size: 0.78rem; font-weight: 700; color: var(--text-main); margin-top: 0.2rem; margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.35rem;">
            <span style="color: #F59E0B; font-size: 0.85rem;">👤</span> <span style="color: var(--text-main);">${item.owner && item.owner.trim() ? item.owner : 'Makine Sahibi'}</span>
          </div>

          <div class="sahibinden-badge-row">
            ${isMine ? `<span class="sahibinden-tag-pill my-tag">Sizin İlanınız</span>` : ''}
          </div>

          <div class="sahibinden-location">
            📍 ${item.city}, ${item.district}
          </div>

          <div class="sahibinden-price-row">
            <div class="sahibinden-price-main">
              ${hourlyPriceNum.toLocaleString('tr-TR')} TL <span class="price-unit">/ Saat</span>
            </div>
            <div class="sahibinden-price-sub">
              Günlük: ${item.price.toLocaleString('tr-TR')} TL
            </div>
          </div>
        </div>

        <!-- Bottom Full Width Call Button -->
        <button type="button" onclick="makePhoneCall(event, '${cleanPhone}')" class="btn-sahibinden-call">
          📞 Hemen Ara <span class="call-btn-phone">(${item.phone})</span>
        </button>
      </div>
    `;
  }).join('');
}

// Trigger Photo Upload helper
function triggerPhotoUpload(e) {
  if (e) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.target && e.target.classList.contains('btn-remove-photo-sm')) return;
  }
  
  const fileInput = document.getElementById('input-image-file');
  if (fileInput) {
    fileInput.click();
  }
}

// Direct phone call helper for WebView & Browsers
function makePhoneCall(e, phone) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  const clean = (phone || '').toString().replace(/\D/g, '');
  if (!clean) {
    showToast("Telefon numarası bulunamadı.");
    return false;
  }
  
  showToast("📞 " + clean + " aranıyor...");
  
  try {
    if (window.AndroidNative && typeof window.AndroidNative.makeCall === 'function') {
      window.AndroidNative.makeCall(clean);
      return false;
    }
  } catch(err) {
    console.log("Native call error: ", err);
  }

  window.location.href = "tel:" + clean;
  return false;
}

// Toggle Favorite Heart Function
function toggleFavorite(e, id) {
  if (e) e.stopPropagation();
  const btn = e ? e.currentTarget : null;
  if (btn) {
    if (btn.classList.contains("active-fav")) {
      btn.classList.remove("active-fav");
      btn.innerHTML = "🤍";
      showToast("İlan favorilerinizden çıkarıldı.");
    } else {
      btn.classList.add("active-fav");
      btn.innerHTML = "❤️";
      showToast("❤️ İlan favorilerinize eklendi!");
    }
  }
}

// Apply & Reset Filters
function applyFilters() {
  renderListings();
}

function resetFilters() {
  document.getElementById("filter-search").value = "";
  
  // Reset pills active state
  document.querySelectorAll(".pill-btn").forEach((btn, idx) => {
    if (idx === 0) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  renderListings();
}

// Show All Turkey (Clear City Restrictions & Show All Nationwide Listings)
function showAllTurkey() {
  userCurrentCity = ""; // Clear city restriction temporarily
  document.getElementById("filter-search").value = "";

  // Highlight first pill button
  document.querySelectorAll(".pill-btn").forEach(btn => btn.classList.remove("active"));
  const firstPill = document.querySelector(".quick-category-pills .pill-btn");
  if (firstPill) firstPill.classList.add("active");

  renderListings();
  showToast("🇹🇷 Türkiye genelindeki tüm şehirler ve ilanlar gösteriliyor.");
}

// Quick Category Pill Click Handler
function setQuickCategory(query) {
  document.getElementById("filter-search").value = query;

  document.querySelectorAll(".pill-btn").forEach(btn => {
    if ((query === "" && btn.textContent.includes("Tüm")) || (query !== "" && btn.textContent.includes(query))) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  renderListings();
}

// Toggle Extra Category Pills (✨ Tümünü Gör 🔻)
function toggleExtraCategories(e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  
  const extraPills = document.querySelectorAll(".extra-cat-pill");
  const btn = document.getElementById("btn-toggle-categories");
  if (!extraPills.length || !btn) return;

  const isCurrentlyHidden = extraPills[0].style.display === "none" || extraPills[0].style.display === "";

  extraPills.forEach(pill => {
    pill.style.display = isCurrentlyHidden ? "inline-flex" : "none";
  });

  if (isCurrentlyHidden) {
    btn.innerHTML = "✕ Kapat 🔺";
    btn.classList.add("expanded");
  } else {
    btn.innerHTML = "✨ Tümünü Gör 🔻";
    btn.classList.remove("expanded");
  }
}

// Owner Sub-Tabs Handler (İlan Ekle vs İlanlarım)
function switchOwnerTab(tab) {
  const addTab = document.getElementById("owner-tab-add");
  const manageTab = document.getElementById("owner-tab-manage");
  const btnAdd = document.getElementById("tab-add-btn");
  const btnManage = document.getElementById("tab-manage-btn");

  if (tab === 'add') {
    addTab.classList.add("active");
    manageTab.classList.remove("active");
    btnAdd.classList.add("active");
    btnManage.classList.remove("active");
  } else {
    manageTab.classList.add("active");
    addTab.classList.remove("active");
    btnManage.classList.add("active");
    btnAdd.classList.remove("active");
    renderMyListings();
    renderRequests();
  }
}

// Preview & Auto-Compress User Image from Gallery / Dropzone
function previewUserImage(event) {
  const file = event.target && event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      // Auto-resize image to max 800px width/height for fast loading & LocalStorage safety
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      const MAX_SIZE = 800;

      if (width > height) {
        if (width > MAX_SIZE) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Compress to lightweight JPEG (quality 0.75)
      uploadedImageDataUrl = canvas.toDataURL("image/jpeg", 0.75);

      const promptBox = document.getElementById("dropzone-prompt");
      const container = document.getElementById("image-preview-container");
      const imgEl = document.getElementById("image-preview-img");

      if (imgEl) imgEl.src = uploadedImageDataUrl;
      if (promptBox) promptBox.style.display = "none";
      if (container) container.style.display = "flex";
      showToast("📸 Fotoğrafınız başarıyla yüklendi ve ilanınıza eklendi!");
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Remove Photo Handler
function removeUserPhoto(event) {
  if (event) event.stopPropagation();
  const fileInput = document.getElementById("input-image-file");
  const promptBox = document.getElementById("dropzone-prompt");
  const container = document.getElementById("image-preview-container");
  const imgEl = document.getElementById("image-preview-img");

  uploadedImageDataUrl = "";
  if (fileInput) fileInput.value = "";
  if (imgEl) imgEl.src = "";
  if (promptBox) promptBox.style.display = "flex";
  if (container) container.style.display = "none";
}

// Create New Listing (Owner Mode) - Simplified with Custom Gallery Photo Support
function handleCreateListing(event) {
  event.preventDefault();

  if (!currentUser) {
    showToast("⚠️ İlan yayınlayabilmek için lütfen kayıt olun.");
    openAuthModal();
    return;
  }

  const title = document.getElementById("input-title").value.trim();
  const citySelect = document.getElementById("input-city-select").value;
  const districtSelect = document.getElementById("input-district-select").value || "Merkez";
  const price = parseFloat(document.getElementById("input-price").value) || 0;
  const customHourly = parseFloat(document.getElementById("input-hourly-price").value);
  const hourlyPrice = customHourly && customHourly > 0 ? customHourly : Math.round(price / 8);
  const phone = document.getElementById("input-phone").value.trim() || currentUser.phone || "";

  if (!citySelect) {
    alert("Lütfen bir şehir seçiniz.");
    return;
  }

  // Get user selected or custom typed machine type
  const selectedTypeEl = document.getElementById("input-type");
  const selectedTypeVal = selectedTypeEl ? selectedTypeEl.value : "";
  const customTypeVal = document.getElementById("input-custom-type") ? document.getElementById("input-custom-type").value.trim() : "";

  let type = "";
  if (selectedTypeVal === "Diğer" && customTypeVal) {
    type = customTypeVal;
  } else if (selectedTypeVal && selectedTypeVal !== "Diğer") {
    type = selectedTypeVal;
  } else {
    type = title.toLowerCase().includes("jcb") || title.toLowerCase().includes("beko") 
      ? "Beko Loder (JCB)" 
      : title.toLowerCase().includes("mini") 
      ? "Mini Ekskavatör / Kepçe" 
      : title.toLowerCase().includes("bobcat")
      ? "Bobcat Mini Yükleyici"
      : title.toLowerCase().includes("manitou")
      ? "Manitou Telehandler"
      : title.toLowerCase().includes("kamyon")
      ? "Hafriyat Kamyonu"
      : "Paletli Ekskavatör";
  }

  // Use user's own uploaded photo if provided, else fallback to type image
  let image = uploadedImageDataUrl;
  if (!image) {
    image = type === "Beko Loder (JCB)" 
      ? "assets/backhoe_loader.png" 
      : type === "Mini Ekskavatör / Kepçe" 
      ? "assets/mini_excavator.png" 
      : type === "Bobcat Mini Yükleyici"
      ? "assets/bobcat.png"
      : type === "Manitou Telehandler"
      ? "assets/manitou.png"
      : type === "Hafriyat Kamyonu"
      ? "assets/dump_truck.png"
      : "assets/excavator1.png";
  }

  const newListing = {
    id: "kepce-" + Date.now(),
    title: title,
    type: type,
    city: citySelect,
    district: districtSelect,
    price: price,
    hourlyPrice: hourlyPrice,
    period: "Günlük",
    operator: "Operatörlü",
    specs: "Kiralık İş Makinesi",
    phone: phone,
    owner: currentUser.displayName || currentUser.name || "Makine Sahibi",
    image: image,
    status: "available",
    isMyListing: true,
    createdAt: new Date().toISOString()
  };

  listings.unshift(newListing);
  saveListings();

  // Reset form & preview
  document.getElementById("add-listing-form").reset();
  uploadedImageDataUrl = "";
  removeUserPhoto();

  // Clear search filter & set location to new listing city so it's 100% visible
  const searchInput = document.getElementById("filter-search");
  if (searchInput) searchInput.value = "";

  if (newListing.city) {
    userCurrentCity = newListing.city;
    localStorage.setItem(STORAGE_USER_LOCATION_KEY, newListing.city);
    updateUserLocationUI(newListing.city);
  }

  // Re-render both rent view and manage view
  renderListings();
  renderMyListings();

  showToast("🎉 İlanınız başarıyla yayınlandı ve en üstte gösteriliyor!");

  // Switch to main rent view so user immediately sees their listing live!
  switchMode('rent');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Central Helper: Check if an item strictly belongs to the logged-in user
function isItemMine(item) {
  if (!currentUser || !item) return false;
  const cleanUserPhone = currentUser.phone ? currentUser.phone.replace(/\D/g, '') : '';
  const userName = currentUser.name ? currentUser.name.toLowerCase().trim() : '';
  const userCompany = currentUser.company ? currentUser.company.toLowerCase().trim() : '';
  const userDisplayName = currentUser.displayName ? currentUser.displayName.toLowerCase().trim() : '';

  // 1. Check matching phone number (Exact or last 7 digits)
  if (cleanUserPhone && item.phone) {
    const itemPhoneClean = String(item.phone).replace(/\D/g, '');
    if (itemPhoneClean.length >= 7 && (cleanUserPhone.endsWith(itemPhoneClean.slice(-7)) || itemPhoneClean.endsWith(cleanUserPhone.slice(-7)))) {
      return true;
    }
  }

  // 2. Check matching owner name or company
  const itemOwner = (item.owner || '').toLowerCase().trim();
  if (userName && userName.length > 2 && itemOwner.includes(userName)) return true;
  if (userDisplayName && userDisplayName.length > 2 && itemOwner.includes(userDisplayName)) return true;
  if (userCompany && userCompany.length > 2 && itemOwner.includes(userCompany)) return true;

  return false;
}

// Helper to filter strictly the logged-in user's listings
function getMyListings() {
  if (!currentUser) return [];
  return listings.filter(item => isItemMine(item));
}

// Render Owner's Own Listings (Only strictly the user's machines)
function renderMyListings() {
  const container = document.getElementById("my-listings-list");
  if (!container) return;

  const myList = getMyListings();

  const statListingsEl = document.getElementById("dash-stat-my-listings");
  if (statListingsEl) {
    statListingsEl.textContent = `${myList.length}`;
  }

  if (myList.length === 0) {
    container.innerHTML = `
      <div style="background: rgba(15,23,42,0.7); border: 1.5px dashed rgba(245,158,11,0.35); border-radius: 18px; padding: 2.25rem 1.5rem; text-align: center; color: #fff; grid-column: 1 / -1; margin: 0.5rem 0;">
        <div style="margin-bottom: 0.6rem;">
          <img src="assets/logo_3d.png" alt="MakineBul 3D Logo" style="width: 48px; height: 48px; object-fit: contain; filter: drop-shadow(0 4px 10px rgba(245,158,11,0.4));">
        </div>
        <h4 style="font-family: 'Poppins', sans-serif; font-size: 1.1rem; font-weight: 800; color: #F59E0B; margin-bottom: 0.4rem;">Henüz Yayında Makineniz Yok</h4>
        <p style="font-size: 0.84rem; color: #94A3B8; margin-bottom: 1.25rem; max-width: 380px; margin-left: auto; margin-right: auto; line-height: 1.5;">Hemen 'Yeni İlan Ekle' sekmesine geçerek iş makinenizi 1 dakikada müşterilere ulaştırın.</p>
        <button type="button" onclick="switchDashboardTab('add')" style="padding: 0.75rem 1.5rem; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); border: none; color: #0F172A; font-weight: 800; border-radius: 12px; font-size: 0.88rem; cursor: pointer; box-shadow: 0 8px 20px rgba(245,158,11,0.35);">
          ➕ İlk İlanımı Hemen Ekle
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = myList.map(item => {
    const isAvailable = item.status === 'available';
    const statusClass = isAvailable ? 'available' : 'rented';
    const statusText = isAvailable ? '🟢 Müsait' : '🔴 Kirada';
    const hourlyPriceNum = item.hourlyPrice || Math.round(item.price / 8);

    return `
      <div class="card card-listing-sahibinden my-dark-listing-card" style="background: var(--bg-card); border: 1.5px solid var(--border-color); border-radius: 14px; padding: 0.6rem; box-shadow: var(--card-shadow); display: flex; flex-direction: column; justify-content: space-between;">
        
        <!-- Top Image Box -->
        <div class="sahibinden-img-box" style="position: relative; border-radius: 10px; overflow: hidden; background: #0B1120; height: 110px; margin-bottom: 0.45rem; border: 1px solid var(--border-color);">
          <img src="${item.image}" alt="${item.title}" onerror="this.src='assets/excavator1.png'" style="width: 100%; height: 100%; object-fit: cover;">
          <span style="position: absolute; top: 6px; left: 6px; padding: 0.2rem 0.55rem; border-radius: 8px; font-size: 0.65rem; font-weight: 800; background: ${isAvailable ? '#10B981' : '#EF4444'}; color: #FFFFFF; box-shadow: 0 2px 6px rgba(0,0,0,0.4);">
            ${statusText}
          </span>
        </div>
        
        <!-- Details Box -->
        <div style="flex: 1; display: flex; flex-direction: column;">
          <h3 style="font-family: 'Poppins', sans-serif; font-size: 0.85rem; font-weight: 800; color: var(--text-heading); margin: 0 0 0.25rem; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            ${item.title}
          </h3>
          
          <div style="font-size: 0.74rem; color: var(--text-main); margin-bottom: 0.2rem; display: flex; align-items: center; gap: 4px; font-weight: 600;">
            <span style="color: #F59E0B;">👤</span> <span>${item.owner || (currentUser ? currentUser.displayName : 'Makine Sahibi')}</span>
          </div>

          <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.45rem; font-weight: 500;">
            📍 ${item.city}, ${item.district || 'Merkez'}
          </div>

          <div style="margin-top: auto; padding-top: 0.35rem; border-top: 1px solid var(--border-color); margin-bottom: 0.5rem;">
            <div style="font-size: 0.95rem; font-weight: 900; color: #D97706; line-height: 1.1;">
              ${hourlyPriceNum.toLocaleString('tr-TR')} TL <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 600;">/ Saat</span>
            </div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">
              Günlük: <strong style="color: var(--text-heading);">${item.price.toLocaleString('tr-TR')} TL</strong>
            </div>
          </div>
        </div>

        <!-- Management Controls (High Contrast Solid Action Buttons) -->
        <div style="display: flex; flex-direction: column; gap: 0.35rem;">
          <button onclick="toggleStatus('${item.id}')" style="width: 100%; padding: 0.4rem 0.3rem; border-radius: 8px; font-weight: 800; font-size: 0.74rem; cursor: pointer; border: none; background: ${isAvailable ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' : 'linear-gradient(135deg, #10B981 0%, #059669 100%)'}; color: #FFFFFF; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
            ${isAvailable ? '🔴 Kirada Yap' : '🟢 Müsait Yap'}
          </button>

          <div style="display: flex; gap: 0.35rem;">
            <button onclick="openEditModal('${item.id}')" style="flex: 1; padding: 0.4rem 0.2rem; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); border: none; color: #0F172A; font-weight: 800; border-radius: 8px; font-size: 0.74rem; cursor: pointer; box-shadow: 0 2px 8px rgba(245,158,11,0.3);">
              ✏️ Düzenle
            </button>

            <button onclick="deleteListing('${item.id}')" style="flex: 1; padding: 0.4rem 0.2rem; background: #DC2626; border: none; color: #FFFFFF; font-weight: 800; border-radius: 8px; font-size: 0.74rem; cursor: pointer; box-shadow: 0 2px 8px rgba(220,38,38,0.3);">
              🗑️ Sil
            </button>
          </div>
        </div>

      </div>
    `;
  }).join('');
}

// Open Edit Listing Modal (Dynamic Body Injection - Bulletproof)
function openEditModal(id) {
  const item = listings.find(i => String(i.id) === String(id));
  if (!item) { alert('İlan bulunamadı!'); return; }

  // Remove any existing edit modal
  const existing = document.getElementById('edit-modal-dynamic');
  if (existing) existing.remove();

  // Build city options
  const sortedCities = Object.keys(TURKEY_CITIES).sort((a, b) => a.localeCompare(b, 'tr'));
  const cityOptions = sortedCities.map(c =>
    `<option value="${c}" ${c === item.city ? 'selected' : ''}>${c}</option>`
  ).join('');

  // Build district options
  const districts = TURKEY_CITIES[item.city] || ['Merkez'];
  const districtOptions = districts.map(d =>
    `<option value="${d}" ${d === item.district ? 'selected' : ''}>${d}</option>`
  ).join('');

  // Create modal element
  const modal = document.createElement('div');
  modal.id = 'edit-modal-dynamic';
  modal.setAttribute('data-listing-id', item.id);
  modal.style.cssText = [
    'position:fixed',
    'top:0',
    'left:0',
    'width:100vw',
    'height:100vh',
    'background:rgba(15,23,42,0.82)',
    'z-index:2147483647',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'padding:1rem',
    'box-sizing:border-box'
  ].join(';');

  modal.innerHTML = `
    <div style="background:#fff;border-radius:16px;max-width:520px;width:100%;padding:1.75rem;box-shadow:0 20px 60px rgba(0,0,0,0.35);max-height:90vh;overflow-y:auto;position:relative;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;border-bottom:1px solid #E2E8F0;padding-bottom:0.75rem;">
        <h3 style="font-size:1.15rem;font-weight:800;color:#1F2937;margin:0;">✏️ İlanı Düzenle</h3>
        <button onclick="closeEditModal()" style="background:none;border:none;font-size:1.4rem;font-weight:700;cursor:pointer;color:#6B7280;line-height:1;">✕</button>
      </div>

      <div style="margin-bottom:1rem;">
        <label style="display:block;font-size:0.88rem;font-weight:600;color:#374151;margin-bottom:0.4rem;">İlan Başlığı / Makine Modeli *</label>
        <input type="text" id="em-title" value="${item.title}" style="width:100%;padding:0.75rem 0.9rem;border:1.5px solid #E2E8F0;border-radius:10px;font-size:0.9rem;box-sizing:border-box;">
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
        <div>
          <label style="display:block;font-size:0.88rem;font-weight:600;color:#374151;margin-bottom:0.4rem;">Bulunduğu İl *</label>
          <select id="em-city" onchange="updateEditDistricts()" style="width:100%;padding:0.75rem 0.9rem;border:1.5px solid #E2E8F0;border-radius:10px;font-size:0.9rem;box-sizing:border-box;">
            <option value="">-- İl Seçin --</option>
            ${cityOptions}
          </select>
        </div>
        <div>
          <label style="display:block;font-size:0.88rem;font-weight:600;color:#374151;margin-bottom:0.4rem;">Bulunduğu İlçe</label>
          <select id="em-district" style="width:100%;padding:0.75rem 0.9rem;border:1.5px solid #E2E8F0;border-radius:10px;font-size:0.9rem;box-sizing:border-box;">
            ${districtOptions}
          </select>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
        <div>
          <label style="display:block;font-size:0.88rem;font-weight:600;color:#374151;margin-bottom:0.4rem;">Günlük Ücret (TL) *</label>
          <input type="number" id="em-price" value="${item.price}" style="width:100%;padding:0.75rem 0.9rem;border:1.5px solid #E2E8F0;border-radius:10px;font-size:0.9rem;box-sizing:border-box;">
        </div>
        <div>
          <label style="display:block;font-size:0.88rem;font-weight:600;color:#374151;margin-bottom:0.4rem;">Saatlik Ücret (TL)</label>
          <input type="number" id="em-hourly" value="${item.hourlyPrice || Math.round(item.price/8)}" style="width:100%;padding:0.75rem 0.9rem;border:1.5px solid #E2E8F0;border-radius:10px;font-size:0.9rem;box-sizing:border-box;">
        </div>
      </div>

      <div style="margin-bottom:1.25rem;">
        <label style="display:block;font-size:0.88rem;font-weight:600;color:#374151;margin-bottom:0.4rem;">Telefon Numaranız (WhatsApp) *</label>
        <input type="tel" id="em-phone" value="${item.phone}" style="width:100%;padding:0.75rem 0.9rem;border:1.5px solid #E2E8F0;border-radius:10px;font-size:0.9rem;box-sizing:border-box;">
      </div>

      <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
        <button onclick="closeEditModal()" style="padding:0.7rem 1.2rem;background:#F1F5F9;border:1px solid #CBD5E1;color:#475569;font-weight:700;border-radius:10px;cursor:pointer;font-size:0.9rem;">İptal</button>
        <button onclick="saveEditListing('${item.id}')" style="padding:0.7rem 1.4rem;background:linear-gradient(135deg,#F59E0B,#D97706);border:none;color:#1F2937;font-weight:800;border-radius:10px;cursor:pointer;font-size:0.9rem;">💾 Kaydet</button>
      </div>
    </div>
  `;

  // Close on backdrop click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeEditModal();
  });

  document.body.appendChild(modal);
}

function updateEditDistricts() {
  const city = document.getElementById('em-city').value;
  const districtSel = document.getElementById('em-district');
  if (!districtSel) return;
  const districts = TURKEY_CITIES[city] || ['Merkez'];
  districtSel.innerHTML = districts.map(d => `<option value="${d}">${d}</option>`).join('');
}

function closeEditModal() {
  const modal = document.getElementById('edit-modal-dynamic');
  if (modal) modal.remove();
  // Also close old static modal if exists
  const old = document.getElementById('edit-modal');
  if (old) { old.style.display = 'none'; old.classList.remove('active'); }
}

function saveEditListing(id) {
  const target = listings.find(i => String(i.id) === String(id));
  if (!target) { alert('İlan bulunamadı!'); return; }

  const title = document.getElementById('em-title').value.trim();
  const city = document.getElementById('em-city').value;
  const district = document.getElementById('em-district').value;
  const phone = document.getElementById('em-phone').value.trim();
  const price = parseFloat(document.getElementById('em-price').value);
  const hourly = parseFloat(document.getElementById('em-hourly').value);

  if (!title) { alert('İlan başlığı boş olamaz!'); return; }
  if (!city) { alert('Lütfen il seçiniz!'); return; }
  if (!phone) { alert('Telefon numarası boş olamaz!'); return; }
  if (!price || price <= 0) { alert('Günlük ücret geçerli bir değer olmalıdır!'); return; }

  target.title = title;
  target.city = city;
  target.district = district || 'Merkez';
  target.phone = phone;
  target.price = price;
  target.hourlyPrice = hourly > 0 ? hourly : Math.round(price / 8);

  saveListings();
  renderListings();
  renderMyListings();
  closeEditModal();
  showToast('💾 İlan başarıyla güncellendi!');
}

// Legacy functions kept for compatibility
function handleEditCityChange(cityName, selectedDistrict) {}
function handleSaveEditListing(event) { if(event) event.preventDefault(); }


// Toggle Listing Status (Müsait <-> Kirada)
function toggleStatus(id) {
  const target = listings.find(i => i.id === id);

  if (target) {
    target.status = target.status === 'available' ? 'rented' : 'available';
    saveListings();
    renderListings();
    renderMyListings();
    showToast(`İlan durumu "${target.status === 'available' ? 'Müsait' : 'Kirada'}" olarak güncellendi.`);
  }
}

// Delete Listing
function deleteListing(id) {
  if (confirm("Bu ilanı silmek istediğinizden emin misiniz?")) {
    listings = listings.filter(i => i.id !== id);
    saveListings();
    renderListings();
    renderMyListings();
    updateLoggedInDashboardUI();
    showToast("İlan silindi.");
  }
}

// Rental Request Modal
function openRequestModal(id) {
  const item = listings.find(i => i.id === id);
  if (!item) return;

  document.getElementById("modal-listing-id").value = item.id;
  document.getElementById("modal-machinery-title").textContent = item.title;
  document.getElementById("modal-machinery-sub").textContent = `Firma: ${item.owner} | Konum: ${item.city}`;
  
  const cleanPhone = item.phone.replace(/\D/g, '');
  const phoneBtn = document.getElementById("modal-phone-btn");
  if (phoneBtn) {
    phoneBtn.href = `tel:${cleanPhone}`;
    phoneBtn.onclick = function(e) { makePhoneCall(e, cleanPhone); };
    phoneBtn.textContent = `📞 ${item.phone} (Hemen Ara)`;
  }

  const whatsappBtn = document.getElementById("modal-whatsapp-btn");
  const waText = encodeURIComponent(`Merhaba, MakineBul uygulamasından "${item.title}" ilanınız için kiralama bilgi almak istiyorum.`);
  whatsappBtn.href = `https://wa.me/90${cleanPhone.startsWith('0') ? cleanPhone.substring(1) : cleanPhone}?text=${waText}`;

  document.getElementById("request-modal").classList.add("active");
}

function closeRequestModal() {
  document.getElementById("request-modal").classList.remove("active");
  document.getElementById("rental-request-form").reset();
}

// Handle Rental Request Submit
function handleSendRentalRequest(event) {
  event.preventDefault();
  const listingId = document.getElementById("modal-listing-id").value;
  const item = listings.find(i => i.id === listingId);

  const clientName = document.getElementById("req-name").value.trim();
  const clientPhone = document.getElementById("req-phone").value.trim();
  const duration = document.getElementById("req-duration").value.trim();

  const newReq = {
    id: "req-" + Date.now(),
    listingId,
    machineryTitle: item ? item.title : "Genel Talep",
    clientName,
    clientPhone,
    duration,
    createdAt: new Date().toISOString()
  };

  requests.unshift(newReq);
  saveRequests();

  closeRequestModal();
  showToast("🎉 Talebiniz makine sahibine başarıyla iletildi!");
}

// Render Received Requests (Owner View)
function renderRequests() {
  const container = document.getElementById("received-requests-list");
  if (!container) return;
  if (requests.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">Henüz gelen kiralama talebi yok.</p>`;
    return;
  }

  container.innerHTML = requests.map(req => {
    const dateStr = new Date(req.createdAt).toLocaleDateString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    return `
      <div class="request-item">
        <h5>🚜 ${req.machineryTitle}</h5>
        <p><strong>Talep Eden:</strong> ${req.clientName} (${req.clientPhone})</p>
        <p><strong>Detay:</strong> ${req.duration}</p>
        <div class="request-time">🕒 ${dateStr}</div>
      </div>
    `;
  }).join('');
}

// Biz Kimiz Modal Handlers
function openAboutModal() {
  document.getElementById("about-modal").classList.add("active");
}

function closeAboutModal() {
  document.getElementById("about-modal").classList.remove("active");
}

// Live Price Formatter Helper for Form Inputs
function formatPriceHelper(inputId, helperId) {
  const val = parseFloat(document.getElementById(inputId).value);
  const helperEl = document.getElementById(helperId);
  if (!helperEl) return;

  if (isNaN(val) || val <= 0) {
    helperEl.style.display = "none";
    helperEl.innerHTML = "";
    return;
  }

  const formattedNum = val.toLocaleString('tr-TR');
  let text = `✨ <strong>${formattedNum} TL</strong>`;

  if (val >= 1000) {
    const binPart = Math.floor(val / 1000);
    const kalanPart = val % 1000;
    if (kalanPart === 0) {
      text += ` <span class="bin-tag">(${binPart} BİN TL)</span>`;
    } else {
      text += ` <span class="bin-tag">(${binPart} BİN ${kalanPart} TL)</span>`;
    }
  }

  helperEl.style.display = "block";
  helperEl.innerHTML = text;
}

// Toast Helper (Null-Safe)
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(15,23,42,0.92);color:#fff;padding:0.75rem 1.25rem;border-radius:25px;font-size:0.85rem;font-weight:600;z-index:99999;box-shadow:0 4px 16px rgba(0,0,0,0.3);transition:all 0.3s ease;";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.display = "block";
  toast.style.opacity = "1";
  setTimeout(() => {
    if (toast) {
      toast.style.opacity = "0";
      setTimeout(() => { if (toast) toast.style.display = "none"; }, 300);
    }
  }, 3500);
}

// ==================== DYNAMIC THEME SYSTEM (DARK / LIGHT MODE) ====================
let currentTheme = localStorage.getItem("makinebul_theme") || "dark";

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("makinebul_theme", theme);

  const iconEls = document.querySelectorAll(".theme-toggle-icon");
  if (theme === "light") {
    iconEls.forEach(el => el.textContent = "☀️");
  } else {
    iconEls.forEach(el => el.textContent = "🌙");
  }
}

function toggleTheme() {
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  showToast(newTheme === "light" ? "☀️ Gündüz Moduna Geçildi" : "🌙 Gece Moduna Geçildi");
}

// Initialize theme on load
try {
  applyTheme(currentTheme);
} catch(e) {}

