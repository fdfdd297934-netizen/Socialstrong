// Hero enquiry form handler (separate file)
function handleHeroEnquiry(event) {
    event.preventDefault();
    const name = document.getElementById('hero-name') ? document.getElementById('hero-name').value : '';
    const email = document.getElementById('hero-email') ? document.getElementById('hero-email').value : '';
    alert(`Thanks ${name}! We'll contact you at ${email} to schedule your free 15-minute audit.`);
    if (event.target && typeof event.target.reset === 'function') event.target.reset();
}
