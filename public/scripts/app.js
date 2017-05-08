//my javascript
//bootstrapcdn
//<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script language="JavaScript" type="text/javascript">
  $(document).ready(function(){
    $('.myCarousel').carousel({
      interval: 3000
    })
  });    

// IIFE
(function(){
  $(".btn-danger").click(function(event){
    if(!confirm("Are you sure?")) {
      event.preventDefault();
      window.location.assign("contact/index");
    }
  })
})();
</script>

