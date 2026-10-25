/**
 * God of War III PC Launcher - Dynamic Releases, Media Controller & i18n
 * Developed for ScreamAngel/gow3_launcher
 * Languages: Turkish (tr), English (en), German (de), Spanish (es)
 */

document.addEventListener('DOMContentLoaded', () => {
    initI18n();
    initGitHubRelease();
    initAudioPlayer();
    initMobileMenu();
    initSmoothScroll();
    initDropdowns();
});

/* ==========================================================================
   1. Multi-Language / Internationalization (i18n)
   ========================================================================== */
const DEFAULT_LANG = 'tr';
let currentLang = DEFAULT_LANG;
let latestReleaseData = null;

const localeDateMap = {
    tr: 'tr-TR',
    en: 'en-US',
    de: 'de-DE',
    es: 'es-ES'
};

const translations = {
    tr: {
        lang_display: "🇹🇷 Türkçe",
        nav_home: "Ana Sayfa",
        nav_features: "Özellikler",
        nav_preview: "Önizleme",
        nav_install: "Kurulum",
        nav_notes: "Sürüm Notları",
        nav_projects: "Diğer Çalışmalarım",
        hero_badge: "Açık Kaynaklı PC Başlatıcı",
        hero_title: "God Of War III PC Launcher",
        hero_subtitle: "Windows, Linux ve Steam Deck üzerinde God of War III Remastered deneyimini kusursuzlaştırmak için tasarlanmış; otomatik donanım optimizasyonu, akıllı yama yönetimi ve gelişmiş kontrolcü desteğine sahip modern başlatıcı.",
        badge_version_suffix: "Yayında",
        badge_win: "Windows 01.02",
        badge_linux: "Linux 01.00 & 01.02",
        badge_deck: "Steam Deck Hazır",
        badge_free: "%100 Ücretsiz & Açık Kaynak",
        btn_download: "Hemen İndir",
        btn_download_title: "Son sürümü hemen indirin",
        btn_github: "GitHub Deposu",
        feat_tag: "Üstün Yetenekler",
        feat_title: "Neden Bu Başlatıcı?",
        feat_desc: "God of War III'ü modern donanımlarda karmaşık ayarlarla uğraşmadan en yüksek performansla oynamanız için geliştirildi.",
        feat1_title: "Otomatik Donanım Optimizasyonu",
        feat1_desc: "Sisteminizin GPU ve donanım yeteneklerini tarar; <code>gow3.ini</code> ve <code>gow3-deck.ini</code> yapılandırma dosyalarını en ideal performans için otomatik olarak üretir.",
        feat2_title: "Linux & Steam Deck & Windows",
        feat2_desc: "Platform fark etmeksizin çalışır. Linux üzerinde 01.00 ve 01.02, Windows üzerinde 01.02 sürümleriyle tam uyumluluk sunar. Steam Deck el konsolu için optimize edilmiştir.",
        feat3_title: "Gelişmiş Kontrolcü Desteği",
        feat3_desc: "Sağ analog çubuğu düzeltmeleri, gamepad tuş atamaları ve arayüzdeki özel buton şekilleriyle konsol konforunda oynanış sağlar.",
        feat4_title: "Akıllı Konum & Yama Tespiti",
        feat4_desc: "Oyunun kurulu olduğu dizini otomatik tespit eder. Güncellemeleri ve yamaları tek tıkla uygulayarak kurulum karmaşasını ortadan kaldırır.",
        feat5_title: "Anlık Hata Günlükleri (Log)",
        feat5_desc: "Olası bir çökme veya problem durumunda, launcher içerisindeki log görüntüleyici sayesinde log dosyalarına anında erişip hata kaynağını tespit edebilirsiniz.",
        feat6_title: "Otomatik Güncelleme Bildirimi",
        feat6_desc: "Yeni bir sürüm yayınlandığında başlatıcı bunu otomatik denetler ve her zaman en son optimizasyonlarla oynamanızı güvenceye alır.",
        showcase_title: "Olimpos Tanrılarına Meydan Okuyun",
        showcase_desc: "PC ve el konsollarında yüksek çözünürlük ve akıcı kare hızlarıyla efsanevi macerayı yeniden yaşayın.",
        showcase_btn: "Başlamaya Hazır Mısınız?",
        step_tag: "Hızlı Kurulum",
        step_title: "3 Kolay Adımda Kurulum",
        step_desc: "Karmaşık rehberlere veya komut satırlarına gerek yok; dakikalar içinde savaşa başlayın.",
        step1_title: "Arşivi İndirin",
        step1_desc: "Sayfanın üstündeki 'Hemen İndir' butonuna tıklayarak son sürüm <code>gow3-windows-linux.zip</code> dosyasını bilgisayarınıza indirin.",
        step2_title: "Klasöre Çıkartın",
        step2_desc: "İndirdiğiniz zip arşivini sağ tıklayıp istediğiniz bir dizine çıkartın. Tüm gerekli başlatıcı ve yapılandırma araçları klasörün içindedir.",
        step3_title: "Başlatıcıyı Çalıştırın",
        step3_desc: "Windows için <code>gow3-launcher-win.exe</code>, Linux & Steam Deck için <code>gow3-launcher</code> dosyasını çalıştırın. Ayarlarınızı kaydedin ve oyunun keyfini çıkarın!",
        change_tag: "Sürüm Geçmişi",
        change_title: "Son Sürüm Notları",
        change_desc: "Geliştirici tarafından yayınlanan en güncel iyileştirmeler ve hata onarımları.",
        change_version_label: "Sürüm:",
        change_badge: "En Son Güncelleme",
        change_alert: "Dikkat: Windows sürümü God Of War III Remastered 01.02, Linux sürümü 01.00 ve 01.02 desteklemektedir.",
        change_sub: "Öne Çıkan Değişiklikler:",
        change_line1: "Windows tarafındaki güncelleme sorunu giderildi.",
        change_line2: "Sağ analog çubuğu eşleme (mapping) hatası düzeltildi.",
        change_line3: "Buton atamalarına özel simgeler ve şekiller eklendi.",
        change_line4: "Kullanıcı arayüzünde performans ve kararlılık geliştirmeleri yapıldı.",
        change_line5: "Windows desteği stabil hale getirildi ve tespit edilen hatalar giderildi.",
        change_github: "GitHub Releases üzerinden tüm sürümleri ve detayları görüntüle",
        footer_sub: "Açık kaynaklı, topluluk odaklı başlatıcı projesi.",
        footer_copy: "Açık kaynak kodlu yazılım.",
        footer_disc: "God of War ve ilgili tüm materyaller Sony Interactive Entertainment ve Santa Monica Studio'nun tescilli ticari markalarıdır. Bu proje kâr amacı gütmeyen hayran yapımı bir başlatıcıdır."
    },
    en: {
        lang_display: "🇬🇧 English",
        nav_home: "Home",
        nav_features: "Features",
        nav_preview: "Preview",
        nav_install: "Installation",
        nav_notes: "Release Notes",
        nav_projects: "Other Projects",
        hero_badge: "Open Source PC Launcher",
        hero_title: "God Of War III PC Launcher",
        hero_subtitle: "A modern launcher designed to perfect the God of War III Remastered experience on Windows, Linux, and Steam Deck with automatic hardware optimization, smart patch management, and advanced controller support.",
        badge_version_suffix: "Released",
        badge_win: "Windows 01.02",
        badge_linux: "Linux 01.00 & 01.02",
        badge_deck: "Steam Deck Ready",
        badge_free: "100% Free & Open Source",
        btn_download: "Download Now",
        btn_download_title: "Download the latest release now",
        btn_github: "GitHub Repository",
        feat_tag: "Key Capabilities",
        feat_title: "Why This Launcher?",
        feat_desc: "Built to let you play God of War III on modern hardware with peak performance and zero complex setups.",
        feat1_title: "Automatic Hardware Optimization",
        feat1_desc: "Scans your GPU and hardware capabilities; automatically generates <code>gow3.ini</code> and <code>gow3-deck.ini</code> configuration files for optimal performance.",
        feat2_title: "Linux, Steam Deck & Windows",
        feat2_desc: "Works seamlessly across platforms. Fully compatible with version 01.02 on Windows, and 01.00 & 01.02 on Linux. Tailor-made for Steam Deck.",
        feat3_title: "Advanced Controller Support",
        feat3_desc: "Features right analog stick fixes, gamepad button mappings, and dedicated on-screen button icons for console-grade comfort.",
        feat4_title: "Smart Location & Patch Detection",
        feat4_desc: "Automatically detects your game installation directory. Applies updates and patches with one click, eliminating setup hassle.",
        feat5_title: "Live Error Logs & Diagnostics",
        feat5_desc: "In case of any crash or glitch, instantly access and review log files directly inside the launcher to diagnose issues.",
        feat6_title: "Automatic Update Notifications",
        feat6_desc: "The launcher automatically checks for new releases on startup, ensuring you always play with the latest optimizations.",
        showcase_title: "Challenge the Gods of Olympus",
        showcase_desc: "Relive the legendary adventure on PC and handheld devices with high resolution and fluid frame rates.",
        showcase_btn: "Ready to Begin?",
        step_tag: "Quick Setup",
        step_title: "3 Easy Setup Steps",
        step_desc: "No complex manuals or command lines required; join the battle in just a few minutes.",
        step1_title: "Download the Archive",
        step1_desc: "Click the 'Download Now' button above to download the latest <code>gow3-windows-linux.zip</code> package to your PC.",
        step2_title: "Extract to a Folder",
        step2_desc: "Right-click and extract the downloaded zip archive to any folder. All necessary launcher binaries and tuning tools are included.",
        step3_title: "Launch the App",
        step3_desc: "Run <code>gow3-launcher-win.exe</code> on Windows, or <code>gow3-launcher</code> on Linux & Steam Deck. Save your settings and enjoy the game!",
        change_tag: "Changelog",
        change_title: "Latest Release Notes",
        change_desc: "The latest improvements and bug fixes published by the developer.",
        change_version_label: "Version:",
        change_badge: "Latest Release",
        change_alert: "Attention: Windows version supports God Of War III Remastered 01.02, Linux version supports 01.00 and 01.02.",
        change_sub: "Highlighted Changes:",
        change_line1: "Fixed update issues on Windows systems.",
        change_line2: "Fixed right analog stick mapping error.",
        change_line3: "Added custom shapes and icons to button assignments.",
        change_line4: "Performance and stability enhancements made across the UI.",
        change_line5: "Windows support stabilized and identified bugs resolved.",
        change_github: "View all releases and full details on GitHub Releases",
        footer_sub: "Open source, community-driven launcher project.",
        footer_copy: "Open source software.",
        footer_disc: "God of War and all related materials are registered trademarks of Sony Interactive Entertainment and Santa Monica Studio. This project is a non-commercial fan-made launcher."
    },
    de: {
        lang_display: "🇩🇪 Deutsch",
        nav_home: "Startseite",
        nav_features: "Funktionen",
        nav_preview: "Vorschau",
        nav_install: "Installation",
        nav_notes: "Versionshinweise",
        nav_projects: "Weitere Projekte",
        hero_badge: "Open-Source-PC-Launcher",
        hero_title: "God Of War III PC Launcher",
        hero_subtitle: "Ein moderner Launcher zur Optimierung des God of War III Remastered-Erlebnisses auf Windows, Linux und Steam Deck mit automatischer Hardware-Optimierung, intelligenter Patch-Verwaltung und erweiterter Controller-Unterstützung.",
        badge_version_suffix: "Veröffentlicht",
        badge_win: "Windows 01.02",
        badge_linux: "Linux 01.00 & 01.02",
        badge_deck: "Steam Deck Bereit",
        badge_free: "100% Kostenlos & Open Source",
        btn_download: "Jetzt Herunterladen",
        btn_download_title: "Die neueste Version herunterladen",
        btn_github: "GitHub-Repository",
        feat_tag: "Spitzenleistung",
        feat_title: "Warum dieser Launcher?",
        feat_desc: "Entwickelt, um God of War III auf moderner Hardware mit maximaler Leistung ohne komplizierte Einrichtung zu spielen.",
        feat1_title: "Automatische Hardware-Optimierung",
        feat1_desc: "Scannt Ihre GPU- und Hardware-Fähigkeiten; erstellt automatisch optimale <code>gow3.ini</code> und <code>gow3-deck.ini</code> Konfigurationsdateien.",
        feat2_title: "Linux, Steam Deck & Windows",
        feat2_desc: "Plattformübergreifend lauffähig. Voll kompatibel mit 01.02 unter Windows sowie 01.00 & 01.02 unter Linux. Optimiert für Steam Deck.",
        feat3_title: "Erweiterte Controller-Unterstützung",
        feat3_desc: "Korrektur des rechten Analogsticks, Tastenbelegung und Konsolensymbole auf der Benutzeroberfläche.",
        feat4_title: "Intelligente Pfad- & Patch-Erkennung",
        feat4_desc: "Erkennt das Spielverzeichnis automatisch. Patches und Updates lassen sich mit einem Klick anwenden.",
        feat5_title: "Live-Fehlerprotokolle (Log)",
        feat5_desc: "Im Falle eines Absturzes können Protokolldateien direkt im Launcher eingesehen werden, um die Fehlerquelle zu finden.",
        feat6_title: "Automatische Update-Benachrichtigung",
        feat6_desc: "Der Launcher prüft beim Start automatisch auf neue Versionen, damit Sie immer optimal spielen.",
        showcase_title: "Fordern Sie die Götter des Olymps heraus",
        showcase_desc: "Erleben Sie das legendäre Abenteuer auf PC und Handhelds mit hoher Auflösung und flüssigen Bildraten neu.",
        showcase_btn: "Bereit zum Start?",
        step_tag: "Schnellstart",
        step_title: "In 3 einfachen Schritten einrichten",
        step_desc: "Keine komplizierten Anleitungen oder Konsolenbefehle; starten Sie die Schlacht in wenigen Minuten.",
        step1_title: "Archiv herunterladen",
        step1_desc: "Klicken Sie oben auf 'Jetzt Herunterladen', um die neueste <code>gow3-windows-linux.zip</code> Datei herunterzuladen.",
        step2_title: "In Ordner entpacken",
        step2_desc: "Entpacken Sie das ZIP-Archiv in ein beliebiges Verzeichnis. Alle erforderlichen Starter-Tools sind enthalten.",
        step3_title: "Launcher starten",
        step3_desc: "Starten Sie <code>gow3-launcher-win.exe</code> unter Windows oder <code>gow3-launcher</code> unter Linux & Steam Deck. Viel Spaß!",
        change_tag: "Versionsverlauf",
        change_title: "Neueste Versionshinweise",
        change_desc: "Die neuesten Verbesserungen und Fehlerbehebungen des Entwicklers.",
        change_version_label: "Version:",
        change_badge: "Neueste Version",
        change_alert: "Achtung: Windows unterstützt God of War III Remastered 01.02, Linux unterstützt 01.00 und 01.02.",
        change_sub: "Wichtigste Änderungen:",
        change_line1: "Update-Probleme unter Windows behoben.",
        change_line2: "Fehler bei der Zuordnung des rechten Analogsticks behoben.",
        change_line3: "Spezielle Symbole und Formen zu Tastenzuweisungen hinzugefügt.",
        change_line4: "Leistungs- und Stabilitätsverbesserungen der Benutzeroberfläche.",
        change_line5: "Windows-Unterstützung stabilisiert und Fehler behoben.",
        change_github: "Alle Versionen und Details auf GitHub Releases anzeigen",
        footer_sub: "Open-Source-Launcher-Projekt aus der Community.",
        footer_copy: "Open-Source-Software.",
        footer_disc: "God of War und alle zugehörigen Materialien sind eingetragene Marken von Sony Interactive Entertainment und Santa Monica Studio. Dies ist ein nicht-kommerzieller Fan-Launcher."
    },
    es: {
        lang_display: "🇪🇸 Español",
        nav_home: "Inicio",
        nav_features: "Características",
        nav_preview: "Vista Previa",
        nav_install: "Instalación",
        nav_notes: "Notas de Versión",
        nav_projects: "Otros Proyectos",
        hero_badge: "Lanzador de PC de Código Abierto",
        hero_title: "God Of War III PC Launcher",
        hero_subtitle: "Un lanzador moderno diseñado para perfeccionar la experiencia de God of War III Remastered en Windows, Linux y Steam Deck con optimización automática de hardware, gestión inteligente de parches y soporte avanzado de mandos.",
        badge_version_suffix: "Disponible",
        badge_win: "Windows 01.02",
        badge_linux: "Linux 01.00 & 01.02",
        badge_deck: "Listo para Steam Deck",
        badge_free: "100% Gratis y Código Abierto",
        btn_download: "Descargar Ahora",
        btn_download_title: "Descargar la última versión ahora",
        btn_github: "Repositorio GitHub",
        feat_tag: "Capacidades Destacadas",
        feat_title: "¿Por qué este lanzador?",
        feat_desc: "Desarrollado para jugar a God of War III en hardware moderno con el máximo rendimiento y sin configuraciones complejas.",
        feat1_title: "Optimización Automática de Hardware",
        feat1_desc: "Escanea la GPU y hardware de su sistema; genera automáticamente los archivos de configuración <code>gow3.ini</code> y <code>gow3-deck.ini</code> para el mejor rendimiento.",
        feat2_title: "Linux, Steam Deck y Windows",
        feat2_desc: "Funciona perfectamente entre plataformas. Totalmente compatible con 01.02 en Windows, y 01.00 y 01.02 en Linux. Optimizado para Steam Deck.",
        feat3_title: "Soporte Avanzado para Mandos",
        feat3_desc: "Correcciones del joystick analógico derecho, asignación de botones e iconos de mando en la interfaz.",
        feat4_title: "Detección Inteligente de Ruta y Parches",
        feat4_desc: "Detecta automáticamente el directorio del juego. Aplica actualizaciones y parches con un solo clic.",
        feat5_title: "Registros de Errores en Vivo (Log)",
        feat5_desc: "En caso de fallo, acceda a los archivos de registro directamente desde el lanzador para diagnosticar el problema.",
        feat6_title: "Notificación Automática de Actualizaciones",
        feat6_desc: "El lanzador busca automáticamente nuevas versiones al iniciar, asegurando que siempre juegue con las últimas mejoras.",
        showcase_title: "Desafía a los Dioses del Olimpo",
        showcase_desc: "Revive la legendaria aventura en PC y consolas portátiles con alta resolución y velocidades de cuadro fluidas.",
        showcase_btn: "¿Listo para empezar?",
        step_tag: "Inicio Rápido",
        step_title: "Instalación en 3 sencillos pasos",
        step_desc: "Sin guías complejas ni líneas de comandos; únete a la batalla en cuestión de minutos.",
        step1_title: "Descarga el archivo",
        step1_desc: "Haz clic en 'Descargar Ahora' arriba para descargar el último paquete <code>gow3-windows-linux.zip</code>.",
        step2_title: "Extrae en una carpeta",
        step2_desc: "Haz clic derecho y extrae el archivo zip en cualquier carpeta. Incluye todas las herramientas del lanzador.",
        step3_title: "Ejecuta el lanzador",
        step3_desc: "Ejecuta <code>gow3-launcher-win.exe</code> en Windows o <code>gow3-launcher</code> en Linux y Steam Deck. ¡Guarda y disfruta!",
        change_tag: "Historial de Versiones",
        change_title: "Notas de la Última Versión",
        change_desc: "Las últimas mejoras y correcciones de errores publicadas por el desarrollador.",
        change_version_label: "Versión:",
        change_badge: "Última Versión",
        change_alert: "Atención: La versión para Windows es compatible con God of War III Remastered 01.02, la versión para Linux con 01.00 y 01.02.",
        change_sub: "Cambios Destacados:",
        change_line1: "Se corrigió el problema de actualización en Windows.",
        change_line2: "Se corrigió el error de mapeo del stick analógico derecho.",
        change_line3: "Se añadieron formas e iconos personalizados a la asignación de botones.",
        change_line4: "Mejoras de rendimiento y estabilidad en la interfaz de usuario.",
        change_line5: "Soporte de Windows estabilizado y errores resueltos.",
        change_github: "Ver todas las versiones y detalles en GitHub Releases",
        footer_sub: "Proyecto de lanzador de código abierto impulsado por la comunidad.",
        footer_copy: "Software de código abierto.",
        footer_disc: "God of War y todos los materiales relacionados son marcas registradas de Sony Interactive Entertainment y Santa Monica Studio. Este proyecto es un lanzador no comercial hecho por fans."
    }
};

function initI18n() {
    const savedLang = localStorage.getItem('gow3_lang');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    } else {
        const browserLang = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
        if (translations[browserLang]) {
            currentLang = browserLang;
        }
    }

    applyLanguage(currentLang);

    // Language option click listeners
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLang = btn.getAttribute('data-lang');
            if (targetLang && translations[targetLang]) {
                currentLang = targetLang;
                localStorage.setItem('gow3_lang', currentLang);
                applyLanguage(currentLang);
                // Close dropdown
                const langDropdown = btn.closest('.dropdown');
                if (langDropdown) langDropdown.classList.remove('open');
            }
        });
    });
}

function applyLanguage(lang) {
    const dict = translations[lang] || translations[DEFAULT_LANG];
    document.documentElement.lang = lang;

    // Update active label
    const labelEl = document.getElementById('currentLangLabel');
    if (labelEl) {
        labelEl.textContent = dict.lang_display;
    }

    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    });

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) {
            el.innerHTML = dict[key];
        }
    });

    // Update dynamic download button text & title
    const downloadBtnText = document.getElementById('btnDownloadPrefix');
    if (downloadBtnText) {
        downloadBtnText.textContent = dict.btn_download;
    }

    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn && dict.btn_download_title) {
        downloadBtn.setAttribute('title', dict.btn_download_title);
    }

    // Update dynamic version suffix
    const versionSuffix = document.getElementById('versionSuffixText');
    if (versionSuffix) {
        versionSuffix.textContent = dict.badge_version_suffix;
    }

    // Re-render release date if we have release data
    if (latestReleaseData) {
        updateReleaseDateUI(latestReleaseData);
    }
}

function updateReleaseDateUI(data) {
    const releaseDateText = document.getElementById('releaseDate');
    if (releaseDateText && data.published_at) {
        const pubDate = new Date(data.published_at);
        const locale = localeDateMap[currentLang] || 'tr-TR';
        const formattedDate = pubDate.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        releaseDateText.textContent = formattedDate;
    }
}

/* ==========================================================================
   2. Dynamic GitHub Release Fetcher
   ========================================================================== */
const GITHUB_REPO = 'ScreamAngel/gow3_launcher';
const API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
const FALLBACK_DOWNLOAD_URL = `https://github.com/${GITHUB_REPO}/releases/latest/download/gow3-windows-linux.zip`;
const FALLBACK_VERSION = 'v1.3';

async function initGitHubRelease() {
    const downloadBtn = document.getElementById('downloadBtn');
    const releaseVersionText = document.getElementById('releaseVersion');
    const changelogVersionText = document.getElementById('changelogVersion');
    const versionTagText = document.getElementById('versionTagText');
    const releaseSizeText = document.getElementById('releaseSize');

    try {
        const response = await fetch(API_URL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        latestReleaseData = data;
        const tagName = data.tag_name || FALLBACK_VERSION;
        
        let downloadUrl = FALLBACK_DOWNLOAD_URL;
        let assetSize = null;

        if (data.assets && data.assets.length > 0) {
            const zipAsset = data.assets.find(a => a.name.endsWith('.zip')) || data.assets[0];
            downloadUrl = zipAsset.browser_download_url;
            if (zipAsset.size) {
                assetSize = (zipAsset.size / (1024 * 1024)).toFixed(1) + ' MB';
            }
        }

        if (downloadBtn) {
            downloadBtn.href = downloadUrl;
        }

        if (releaseVersionText) {
            releaseVersionText.textContent = tagName;
        }

        if (changelogVersionText) {
            changelogVersionText.textContent = tagName;
        }

        if (versionTagText) {
            versionTagText.textContent = tagName;
        }

        if (releaseSizeText && assetSize) {
            releaseSizeText.textContent = assetSize;
        }

        updateReleaseDateUI(data);

    } catch (err) {
        console.warn('GitHub API fetch failed or rate limited, using fallback release info:', err);
        if (downloadBtn && !downloadBtn.href.includes('github.com')) {
            downloadBtn.href = FALLBACK_DOWNLOAD_URL;
        }
        if (releaseVersionText && releaseVersionText.textContent === '...') {
            releaseVersionText.textContent = FALLBACK_VERSION;
        }
        if (versionTagText && versionTagText.textContent === '...') {
            versionTagText.textContent = FALLBACK_VERSION;
        }
        if (changelogVersionText && changelogVersionText.textContent === '...') {
            changelogVersionText.textContent = FALLBACK_VERSION;
        }
        if (releaseSizeText && releaseSizeText.textContent === '...') {
            releaseSizeText.textContent = '~84 MB';
        }
    }
}

/* ==========================================================================
   3. Spartan Audio Player (Rage of Sparta & Tides of Chaos)
   ========================================================================== */
const playlist = [
    { title: 'Rage of Sparta', file: 'rage of sparta.mp3' },
    { title: 'Tides of Chaos', file: 'tides of chaos.mp3' }
];

let currentTrackIndex = 0;
let isAudioPlaying = false;

function initAudioPlayer() {
    const audioEl = document.getElementById('bgAudio');
    const playBtn = document.getElementById('audioPlayBtn');
    const trackBtn = document.getElementById('audioTrackBtn');
    const trackName = document.getElementById('currentTrackName');
    const visualizer = document.getElementById('audioVisualizer');

    if (!audioEl || !playBtn) return;

    function updateTrackUI() {
        if (trackName) {
            trackName.textContent = playlist[currentTrackIndex].title;
        }
        audioEl.src = playlist[currentTrackIndex].file;
    }

    function togglePlay() {
        if (audioEl.paused) {
            audioEl.play().then(() => {
                isAudioPlaying = true;
                updatePlayState(true);
            }).catch(e => {
                console.log('Audio playback prevented or waiting for interaction:', e);
            });
        } else {
            audioEl.pause();
            isAudioPlaying = false;
            updatePlayState(false);
        }
    }

    function updatePlayState(playing) {
        if (playBtn) {
            const icon = playBtn.querySelector('i');
            if (icon) {
                icon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
            }
        }
        if (visualizer) {
            visualizer.classList.toggle('playing', playing);
        }
    }

    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        updateTrackUI();
        if (isAudioPlaying) {
            audioEl.play().catch(e => console.log(e));
        }
    }

    playBtn.addEventListener('click', togglePlay);

    if (trackBtn) {
        trackBtn.addEventListener('click', nextTrack);
    }

    audioEl.addEventListener('ended', () => {
        nextTrack();
    });

    audioEl.addEventListener('pause', () => updatePlayState(false));
    audioEl.addEventListener('play', () => updatePlayState(true));
}

/* ==========================================================================
   4. Mobile Navigation Menu Toggle
   ========================================================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        }
    });

    navMenu.querySelectorAll('a:not(.lang-option)').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    });
}

/* ==========================================================================
   5. Smooth Scrolling for Anchor Links
   ========================================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ==========================================================================
   6. Universal Dropdown Controller (Supports Multiple Dropdowns)
   ========================================================================== */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown-btn');
        if (!btn) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('open');
            });
            dropdown.classList.toggle('open');
        });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        dropdowns.forEach(d => {
            if (!d.contains(e.target)) {
                d.classList.remove('open');
            }
        });
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdowns.forEach(d => d.classList.remove('open'));
        }
    });
}
