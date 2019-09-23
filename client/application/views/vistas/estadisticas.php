<div class="card-header">
	<h5>Estadísticas</h5>
</div>

<div class="card-block">

	<div class="row">
		<div class="col-md-4">Desde</div>
		<div class="col-md-4">Hasta</div>
		<div class="col-md-4"></div>
	</div>

	<div class="row">
		<div class="col-md-4"> <input type="date" class="form-control" id="desde"> </div>
		<div class="col-md-4"> <input type="date" class="form-control" id="hasta"> </div>
		<div class="col-md-4"> <button class="btn btn-danger" type="button" onclick="apilib.estadisticas.por_dias_recuperar();">Recuperar datos</button> </div>
	</div>

	<br><br>
	<div class="row">
		<div class="col-md-6" id="estadistica"></div>
		<div class="col-md-6" id="grafico"></div>
	</div>
	<br><br>
	<div class="row">
		<div class="col-md-6" id="estadistica2"></div>
		<div class="col-md-6" id="grafico2"></div>
	</div>
	



	<div class="font-italic">

	</div>


</div>