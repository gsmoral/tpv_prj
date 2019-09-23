<!DOCTYPE html>
<html lang="es">
<head>
	<title>Menú principal</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="<?=CDN;?>/css/style.css">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="<?=CDN;?>/css/font-awesome-4.7.0/css/font-awesome.min.css">

    <style type="text/css">
        #contenidoshow a{
            
        }
        #contenidoshow a:hover{
            
        }
    
    </style>


</head>
<body>
	<div class="container">

		<div class="row menu">
			<div class="col-2 title">
				<a class="align-middle" href="#">Kaira miniTPV</a>
			</div>
			<div class="col-8 text-center">
				<a href="#" onclick="apilib.ticket.list()" class="btn btn-light opciones-menu">TPV</a>
				<a href="#" onclick="apilib.tickets.list()" class="btn btn-light opciones-menu">Tickets</a>
				<a href="#" style="display:none;" class="btn btn-light opciones-menu">Facturas</a>
				<a href="#" id="user_menu" style="display:none;" onclick="apilib.configuracion.list()" class="btn btn-light opciones-menu">Configuración</a>


			</div>
			<div class="col-2 conectar text-right">
				    <ul class="nav navbar-nav navbar-right">
				      <li><a href="#" onclick="apilib.secure.logout(); window.location.href = './';" class="align-middle"><span class="fa fa-sign-out"></span> Cerrar sesión</a></li>
                     
				    </ul>
			</div>


		</div>

		<!-- Notes card start -->
        <div class="card" id="contenidoshow">

            <?php @$content; ?>

        </div>

		
	</div>

	<!-- Required Jquery -->
    <script type="text/javascript" src="<?=CDN;?>/bower_components/jquery/js/jquery.min.js"></script>
    <script type="text/javascript" src="<?=CDN;?>/bower_components/jquery-ui/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="<?=CDN;?>/bower_components/popper.js/js/popper.min.js"></script>
    <script type="text/javascript" src="<?=CDN;?>/bower_components/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<?=CDN;?>/assets/js/pace.min.js"></script>
    <!-- jquery slimscroll js -->
    <script type="text/javascript" src="<?=CDN;?>/bower_components/jquery-slimscroll/js/jquery.slimscroll.js"></script>
    <!-- waves js -->
    <script src="<?=CDN;?>/assets/pages/waves/js/waves.min.js"></script>

    <!-- modernizr js -->
    <script type="text/javascript" src="<?=CDN;?>/bower_components/modernizr/js/modernizr.js"></script>
    <script type="text/javascript" src="<?=CDN;?>/bower_components/modernizr/js/css-scrollbars.js"></script>


    <!-- data-table js -->
    <script src="<?=CDN;?>/bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="<?=CDN;?>/bower_components/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="<?=CDN;?>/assets/pages/data-table/js/jszip.min.js"></script>
    <script src="<?=CDN;?>/assets/pages/data-table/js/pdfmake.min.js"></script>
    <script src="<?=CDN;?>/assets/pages/data-table/js/vfs_fonts.js"></script>
    <script src="<?=CDN;?>/bower_components/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="<?=CDN;?>/bower_components/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="<?=CDN;?>/bower_components/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="<?=CDN;?>/bower_components/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
    <script src="<?=CDN;?>/bower_components/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>

    <!-- notification js -->
    <script type="text/javascript" src="<?=CDN;?>/assets/js/bootstrap-growl.min.js"></script>
    <script type="text/javascript" src="<?=CDN;?>/assets/pages/notification/notification.js"></script>

    <!-- Custom js -->
    <script src="<?=CDN;?>/assets/pages/data-table/js/data-table-custom.js?v=0.1"></script>
    <script type="text/javascript" src="<?=CDN;?>/assets/js/script.js?v=1"></script>
    <script src="<?=CDN;?>/assets/js/sha1/sha_dev.js"></script>
    <!-- Warning Section Ends -->


    <!-- Custom js -->
    <script src="<?=CDN;?>/assets/mustache.js"></script>

	<!-- APILIB -->
    <script src="<?=CDN;?>/assets/apilib/apilib.js?v=0.1"></script>
    <script src="<?=CDN;?>/assets/apilib/apilib-init.js"></script>
    <script src="<?=CDN;?>/assets/apilib/apilib-ticket.js"></script>
    <script src="<?=CDN;?>/assets/apilib/apilib-tickets.js"></script>
    <script src="<?=CDN;?>/assets/apilib/apilib-configuracion.js"></script>
    <script src="<?=CDN;?>/assets/apilib/apilib-clients.js"></script>
    <script src="<?=CDN;?>/assets/apilib/apilib-products.js"></script>
    <script src="<?=CDN;?>/assets/apilib/apilib-users.js"></script>
    <script src="<?=CDN;?>/assets/apilib/apilib-brands.js"></script>
    <script src="<?=CDN;?>/assets/apilib/apilib-categories.js"></script>
    <script src="<?=CDN;?>/assets/apilib/apilib-estadisticas.js"></script>
    <script src="<?=CDN;?>/assets/apilib/apilib-grafico.js"></script>

        <!-- Google charts -->
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

    <script>
        window.onload = function(){
           console.log("Hola");
            // Cargo la vista TPV por defecto
            apilib.ticket.list();

            var user_type = apilib.token_info.profile;

            if( user_type == 'Admin' ){
                $("#user_menu").show();
            }
        }
    </script>

</body>
</html>