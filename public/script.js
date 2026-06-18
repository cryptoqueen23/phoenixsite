// Mobile nav toggle
const nav = document.querySelector('.nav');
const navToggle = document.getElementById('navToggle');
navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('menu-open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('menu-open'));
});

// Quote form
const form = document.getElementById('quoteForm');
const toast = document.getElementById('toast');

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 3200);
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const zip = (data.get('zip') || '').toString().trim();

  if (!name || !email || !zip || !data.get('coverage')) {
    showToast('Please fill out every field.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email.');
    return;
  }
  if (!/^\d{5}$/.test(zip)) {
    showToast('ZIP code should be 5 digits.');
    return;
  }

  showToast(`Thanks ${name.split(' ')[0]}! We'll be in touch shortly.`);
  form.reset();
});

// Close any other open FAQ when one opens (accordion behavior)
document.querySelectorAll('.faq details').forEach((d) => {
  d.addEventListener('toggle', () => {
    if (d.open) {
      document.querySelectorAll('.faq details').forEach((other) => {
        if (other !== d) other.open = false;
      });
    }
  });
});
