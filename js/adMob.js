var ad_units, admobid;

function createBannerAd() {
    if (!window.plugins || !window.plugins.AdMob) return;
    window.plugins.AdMob.createBannerView();
}

function createInterstitialAd() {
    if (window.plugins && window.plugins.AdMob)
        window.plugins.AdMob.createInterstitialView();
    else
        return false;
    return true;
}

function initAd() {
    ad_units = {
        ios: {
            banner: 'ca-app-pub-9438183178040236/6422348105',
            interstitial: 'ca-app-pub-9438183178040236/7899081300'
        },
        android: {
            banner: 'ca-app-pub-9438183178040236/1852547700',
            interstitial: 'ca-app-pub-9438183178040236/3329280909'
        }
    };
    admobid = (/(android)/i.test(navigator.userAgent)) ? ad_units.android : ad_units.ios;

    try {
        if (window.plugins && window.plugins.AdMob) {

            window.plugins.AdMob.setOptions({
                publisherId: admobid.banner,
                interstitialAdId: admobid.interstitial,
                bannerAtTop: false,
                overlap: true,
                offsetTopBar: false,
                isTesting: false,
                autoShow: true
            });

            registerAdEvents();

        } else {
            console.debug('admob plugin not ready');
        }
    } catch (e) {
        console.error("mini:UIReady ", e.stack);
        alert("initAd erro" + e.message);
    }
}

function registerAdEvents() {
    document.addEventListener('onReceiveAd', function() {});
    document.addEventListener('onFailedToReceiveAd', function(data) {});
    document.addEventListener('onPresentAd', function() {});
    document.addEventListener('onDismissAd', function() {});
    document.addEventListener('onLeaveToAd', function() {});
    document.addEventListener('onReceiveInterstitialAd', function() {});
    document.addEventListener('onPresentInterstitialAd', function() {});
    document.addEventListener('onDismissInterstitialAd', function() {});
}
