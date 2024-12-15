const menuOpen = document.getElementById('hamburger_menu_open');
const menuClose = document.getElementById('hamburger_menu_close');
const menuOpenState = document.getElementById('menu_open_state');
const menuCloseState = document.getElementById('menu_close_state');

menuOpen.addEventListener('click',(e)=>{
  menuOpenState.style.display = 'flex';
  menuCloseState.style.display = 'none';
})

menuClose.addEventListener('click',(e)=>{
  menuOpenState.style.display = 'none';
  menuCloseState.style.display = 'flex';
})