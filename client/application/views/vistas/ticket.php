<div class="row">

	
	<div class="col-7">

		<div class="row productos">
			<table class="table table-hover">
			  <thead>
			    <tr>
			      <th scope="col">Uni.</th>
			      <th scope="col"></th>
			      <th scope="col">Producto</th>
			      <th scope="col">Precio u.</th>
			      <th scope="col">Total</th>
			      <th scope="col"></th>
			    </tr>
			  </thead>
			  <tbody id="listproducts">

			    
			  </tbody>
			</table>
		</div>

		
	</div>

	<div class="col-5">
		
		<div class="row">
			<div class="col">


				
					<div class="form-group">
						
						<input name="product_code" type="text" class="form-control form-control-lg" placeholder="CÓDIGO" id="code">

					</div>
						
					
			</div>
			
		</div>
		

	</div>

	<div class="col-7">

		<div class="row total">
			<div class="col-12">Total</div>
			<div class="col-12" id="total"></div>
		</div>
		
	</div>

	<div class="col-5">
		

		<div class="row">
			<div class="col"><button type="button" class="btn btn-light boton_inferior">Imprimir</button></div>
			<div class="col"><button id="myBtn" type="button" class="btn btn-light boton_inferior">Cobrar</button></div>
		</div>

	</div>



</div>

<!-- The Modal <div id="myModal" class="modal"> -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-contenido">
    <span class="close">&times;</span>
    <h3>PAGO</h3>
    <br>
    <form>
	  <div class="form-group row">
	    <label for="staticEmail" class="col-sm-6 col-form-label">Total a pagar</label>
	    <div class="col-sm-6">
	      <input type="text" readonly class="form-control-plaintext" id="precio_total">
	    </div>
	  </div>
	  <div class="form-group row">
	    <label for="inputPassword" class="col-sm-6 col-form-label">Efectivo</label>
	    <div class="col-sm-6">
	      <input type="number" class="form-control" id="cobrado">

	    </div>
	  </div>
	  <div class="form-group row">
	    <label for="staticEmail" class="col-sm-6 col-form-label">Cambio</label>
	    <div class="col-sm-6" >
	      <input type="text" readonly class="form-control-plaintext" id="cambio">
	    </div>
	  </div>

	</form>

	<div class="row">
			<div class="col"><button type="button" class="btn btn-light boton_inferior">Cobrar e Imprimir</button></div>
			<div class="col"><button type="button" class="btn btn-light boton_inferior" onclick="apilib.ticket.guardar_ticket();">Cobrar</button></div>
	</div>

	
  </div>

</div>