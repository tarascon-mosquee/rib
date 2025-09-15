// ========================================
// FONCTIONS DE COPIE
// ========================================

// copie iban ou bic
async function copyToClipboard(elementId, button) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    try {
        await navigator.clipboard.writeText(text);
        showNotification();
        
        // effet visuel bouton
        const originalText = button.innerHTML;
        button.classList.add('copied');
        button.innerHTML = '<span class="copy-icon">✓</span>Copié !';
        
        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = originalText;
        }, 2000);
        
    } catch (err) {
        // fallback vieux navigateurs
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification();
        } catch (err) {
            console.error('Erreur lors de la copie:', err);
        }
        
        document.body.removeChild(textArea);
    }
}

// affiche notif "copié"
function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ========================================
// BOUTONS PDF ET HORAIRES
// ========================================

// dl le pdf
function downloadPDF() {
    const link = document.createElement('a');
    link.href = './assets/fichiers/pdf.pdf';
    link.download = 'iban-mosquee-tarascon.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ouvre mawaqit
function openPrayerTimes() {
    window.open('https://mawaqit.net/fr/m/m-tarascon', '_blank');
}

// ========================================
// ANIMATIONS ET SETUP
// ========================================

// tout au chargement
document.addEventListener('DOMContentLoaded', function() {
    // accessibilité
    const buttons = document.querySelectorAll('.copy-btn');
    buttons.forEach(button => {
        button.setAttribute('aria-label', 'Copier dans le presse-papier');
    });
    
    // navigation clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});
