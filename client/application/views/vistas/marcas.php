		


<div class="row search">
	<div class="col">
		<div class="input-group md-form form-sm">
		  <input class="form-control" type="text" placeholder="Buscar" aria-label="Buscar" id="search">
		  <div class="input-group-append">
		    <button onclick="apilib.brands.recuperar_list();" class="input-group-text"><i class="fa fa-search text-grey"
		        aria-hidden="true"></i></button>
		  </div>
		</div>
	</div>
</div>
<div class="row">

	
	<div class="col-6">

		<div id="listado"></div>
	
	</div>
	
	<div class="col-6">
		
		<div id="addedit"></div>

	</div>

</div>

<div id="listado"></div>

<script type="text/javascript">
	  $("#search").keypress(function(e) {
       if(e.which == 13) {
          // Acciones a realizar, por ej: enviar formulario.
          apilib.brands.recuperar_list();
       }
    });
</script>