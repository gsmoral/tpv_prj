<div class="card-block">



	<div class="row search">		
		<div class="col" style="text-align: right;">
			<button class="btn btn-success" type="button" onclick="apilib.products.add();">Añadir producto</button>
			<button class="btn btn-success" type="button" onclick="apilib.products.exportar_json();">Exportar</button>
		</div>
	</div>



	<div id="listado"></div>



</div>
<!-- <script type="text/javascript">
	  $("#search").keypress(function(e) {
       if(e.which == 13) {
          // Acciones a realizar, por ej: enviar formulario.
          apilib.products.recuperar_list();
       }
    });
</script> -->