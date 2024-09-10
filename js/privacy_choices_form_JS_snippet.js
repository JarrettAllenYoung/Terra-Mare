
const gpcValue = navigator.globalPrivacyControl;

if (gpcValue) {
    jQuery('.gpc-signal').show();
} else {
    jQuery('.gpc-signal').hide();
}
