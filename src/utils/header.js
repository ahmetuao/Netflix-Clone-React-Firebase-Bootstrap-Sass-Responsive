export function header() {
  let headerElement = document.getElementsByClassName('header');
  document.addEventListener('scroll', function(){
    if(window.pageYOffset > 0) {
      headerElement[0].classList.add('active');
    } else {
      headerElement[0].classList.remove('active');
    }
  })
}