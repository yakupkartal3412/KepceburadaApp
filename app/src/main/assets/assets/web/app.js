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
    image: "assets/excavator1.png",
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
    image: "assets/dump_truck.png",
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

// LocalStorage Keys (v7 for clean refresh)
const STORAGE_LISTINGS_KEY = "kepceburada_listings_v7";
const STORAGE_REQUESTS_KEY = "kepceburada_requests_v7";

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
  const citySelect = document.getElementById("input-city-select");
  if (!citySelect) return;

  const sortedCities = Object.keys(TURKEY_CITIES).sort((a, b) => a.localeCompare(b, 'tr'));
  
  citySelect.innerHTML = `<option value="">-- Şehir Seçin (81 İl) --</option>` + 
    sortedCities.map(city => `<option value="${city}">${city}</option>`).join('');
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
  if (msgEl) msgEl.textContent = "⌛ GPS konumunuza erişiliyor...";

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Mock city lookup or default to Istanbul/Bingol based on lat/lon
        const city = "İstanbul"; // Default detected
        confirmManualLocation(city);
      },
      (error) => {
        if (msgEl) msgEl.textContent = "⚠️ GPS izni verilmedi. Lütfen listeden şehrinizi seçiniz.";
      },
      { timeout: 8000 }
    );
  } else {
    if (msgEl) msgEl.textContent = "⚠️ Tarayıcınız GPS desteklemiyor. Lütfen listeden şehrinizi seçiniz.";
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
  localStorage.setItem(STORAGE_LISTINGS_KEY, JSON.stringify(listings));
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

  // 2. Location Filtering: User-created listings (item.isMyListing) ALWAYS pass through!
  if (userCurrentCity && !searchInput) {
    const allowedCities = NEARBY_CITIES_MAP[userCurrentCity] || [userCurrentCity];
    filtered = filtered.filter(item => {
      if (item.isMyListing) return true; // User's own listing is ALWAYS shown!
      return allowedCities.some(city => item.city.toLowerCase().includes(city.toLowerCase()));
    });
  }

  // 3. Sort listings: User's own listings FIRST, then user's city machines!
  filtered.sort((a, b) => {
    if (a.isMyListing && !b.isMyListing) return -1;
    if (!a.isMyListing && b.isMyListing) return 1;
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
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;" class="card">
        <h3>🔍 Aradığınız Makine Bulunamadı</h3>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">Farklı bir şehir yazabilir veya tüm makineleri gösterebilirsiniz.</p>
        <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="resetFilters()">Tüm İlanları Göster</button>
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

    return `
      <div class="card card-listing-sahibinden">
        <!-- Top Image Container -->
        <div class="sahibinden-img-box">
          <img src="${item.image}" alt="${item.title}" onerror="this.src='assets/excavator1.png'">
          <span class="card-status-badge ${statusClass}">${statusText}</span>
        </div>
        
        <!-- Middle Details Container -->
        <div class="sahibinden-details-box">
          <h3 class="sahibinden-title">${item.title.toUpperCase()}</h3>
          
          <div class="sahibinden-badge-row">
            ${item.isMyListing ? `<span class="sahibinden-tag-pill my-tag">Sizin İlanınız</span>` : ''}
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
        <a href="tel:${cleanPhone}" class="btn-sahibinden-call">
          📞 Hemen Ara (${item.phone})
        </a>
      </div>
    `;
  }).join('');
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

// Global Uploaded Image Base64 Data URL
let uploadedImageDataUrl = "";

// Preview User Image from Gallery / Dropzone
function previewUserImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedImageDataUrl = e.target.result;
    const promptBox = document.getElementById("dropzone-prompt");
    const container = document.getElementById("image-preview-container");
    const imgEl = document.getElementById("image-preview-img");

    if (imgEl) imgEl.src = uploadedImageDataUrl;
    if (promptBox) promptBox.style.display = "none";
    if (container) container.style.display = "flex";
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

  const title = document.getElementById("input-title").value.trim();
  const citySelect = document.getElementById("input-city-select").value;
  const districtSelect = document.getElementById("input-district-select").value || "Merkez";
  const price = parseFloat(document.getElementById("input-price").value) || 0;
  const customHourly = parseFloat(document.getElementById("input-hourly-price").value);
  const hourlyPrice = customHourly && customHourly > 0 ? customHourly : Math.round(price / 8);
  const phone = document.getElementById("input-phone").value.trim();

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
    owner: "Makine Sahibi",
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
  const previewBox = document.getElementById("image-preview-box");
  if (previewBox) {
    previewBox.innerHTML = `<span class="upload-placeholder">🖼️ Galerinizden bir fotoğraf seçtiğinizde önizlemesi burada görünecektir.</span>`;
  }

  // Re-render both rent view and manage view
  renderListings();
  renderMyListings();

  showToast("🎉 İlanınız başarıyla yayınlandı!");

  // Switch to main rent view so user immediately sees their listing live!
  switchMode('rent');
}

// Render Owner's Own Listings (Grid Side-by-Side Layout)
function renderMyListings() {
  const container = document.getElementById("my-listings-list");
  if (!container) return;

  if (listings.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem; grid-column: 1 / -1;">Henüz yayınlanmış ilanınız bulunmuyor.</p>`;
    return;
  }

  container.innerHTML = listings.map(item => {
    const isAvailable = item.status === 'available';
    const statusClass = isAvailable ? 'available' : 'rented';
    const statusText = isAvailable ? '🟢 Müsait' : '🔴 Kirada';
    const hourlyPriceNum = item.hourlyPrice || Math.round(item.price / 8);

    return `
      <div class="card card-listing-sahibinden">
        <!-- Top Image Container -->
        <div class="sahibinden-img-box">
          <img src="${item.image}" alt="${item.title}" onerror="this.src='assets/excavator1.png'">
          <span class="card-status-badge ${statusClass}">${statusText}</span>
        </div>
        
        <!-- Middle Details Container -->
        <div class="sahibinden-details-box">
          <h3 class="sahibinden-title">${item.title.toUpperCase()}</h3>
          
          <div class="sahibinden-badge-row">
            ${item.isMyListing ? `<span class="sahibinden-tag-pill my-tag">Sizin İlanınız</span>` : ''}
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

        <!-- Management Controls Buttons -->
        <div style="display: flex; gap: 0.35rem; margin-top: auto; width: 100%;">
          <button onclick="toggleStatus('${item.id}')" style="flex: 1; padding: 0.5rem 0.3rem; font-size: 0.75rem; font-weight: 700; border-radius: 20px; border: 1.5px solid ${isAvailable ? '#22C55E' : '#EF4444'}; background: ${isAvailable ? '#DCFCE7' : '#FEE2E2'}; color: ${isAvailable ? '#15803D' : '#B91C1C'}; cursor: pointer; transition: all 0.2s ease;">
            ${isAvailable ? '🔴 Kirada Yap' : '🟢 Müsait Yap'}
          </button>

          <button onclick="openEditModal('${item.id}')" style="padding: 0.5rem 0.6rem; font-size: 0.75rem; font-weight: 700; border-radius: 20px; border: 1.5px solid #F59E0B; background: #FEF3C7; color: #B45309; cursor: pointer; transition: all 0.2s ease;" title="İlanı Düzenle">
            ✏️ Düzenle
          </button>

          <button onclick="deleteListing('${item.id}')" style="padding: 0.5rem 0.6rem; font-size: 0.75rem; font-weight: 700; border-radius: 20px; border: 1.5px solid #FCA5A5; background: #FEE2E2; color: #DC2626; cursor: pointer; transition: all 0.2s ease;" title="İlanı Sil">
            🗑️ Sil
          </button>
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
    renderMyListings();
    showToast(`İlan durumu "${target.status === 'available' ? 'Müsait' : 'Kirada'}" olarak güncellendi.`);
  }
}

// Delete Listing
function deleteListing(id) {
  if (confirm("Bu ilanı silmek istediğinizden emin misiniz?")) {
    listings = listings.filter(i => i.id !== id);
    saveListings();
    renderMyListings();
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
  phoneBtn.href = `tel:${cleanPhone}`;
  phoneBtn.textContent = `📞 ${item.phone} (Hemen Ara)`;

  const whatsappBtn = document.getElementById("modal-whatsapp-btn");
  const waText = encodeURIComponent(`Merhaba, KepçeBurada uygulamasından "${item.title}" ilanınız için kiralama bilgi almak istiyorum.`);
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

// Toast Helper
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("active");
  setTimeout(() => {
    toast.classList.remove("active");
  }, 3500);
}
