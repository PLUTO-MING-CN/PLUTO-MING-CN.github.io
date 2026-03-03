function updateDarkmodeIcon(mode) {
  const buttonElement = document.getElementById('darkmode');
  if (buttonElement) {
    const iconElement = buttonElement.querySelector('i');
    if (iconElement) {
      if (mode === 'sun') {
        iconElement.classList.remove('fa-moon');
        iconElement.classList.add('fa-sun');
      } else {
        iconElement.classList.remove('fa-sun');
        iconElement.classList.add('fa-moon');
      }
    }
  }
}


function switchNightMode() {
  const existingSky = document.querySelector('.Cuteen_DarkSky');
  if (existingSky) {
    existingSky.remove();
  }
  
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

  const bodyElement = document.querySelector('body');
  bodyElement.insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>');
  
  const planetElement = document.querySelector('.Cuteen_DarkPlanet');
  
  if (nowMode === 'dark') {
    planetElement.classList.add('to-moon');
  } else {
    planetElement.classList.add('to-sun');
  }
  
  setTimeout(function() {
    if (nowMode === 'light') {
      planetElement.classList.remove('to-sun');
      planetElement.classList.add('to-moon');
    } else {
      planetElement.classList.remove('to-moon');
      planetElement.classList.add('to-sun');
    }
  }, 1000);
  
  setTimeout(function() {
    const willChangeMode = nowMode === 'light' ? 'dark' : 'light';
    
    if (nowMode === 'light') {
      btf.activateDarkMode();
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
      updateDarkmodeIcon('sun');
    } else {
      btf.activateLightMode();
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
      updateDarkmodeIcon('moon');
    }
    
    btf.saveToLocal.set('theme', willChangeMode, 2);
    
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof FB === 'object' && window.loadFBComment();
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);
  }, 100);
  
  setTimeout(function() {
    const skyElement = document.querySelector('.Cuteen_DarkSky');
    if (skyElement) {
      skyElement.style.transition = 'opacity 1.5s';
      skyElement.style.opacity = '0';
      setTimeout(function() {
        if (skyElement.parentNode) {
          skyElement.remove();
        }
      }, 1500);
    }
  }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
  const currentMode = document.documentElement.getAttribute('data-theme');
  if (currentMode === 'dark') {
    updateDarkmodeIcon('sun');
  } else {
    updateDarkmodeIcon('moon');
  }
});
