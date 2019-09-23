<!DOCTYPE html>
<html lang="es">

<head>
    
    <title>Mini TPV</title>
    <!-- Meta -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="author" content="Phoenixcoded" />

    <!-- Required Fremwork -->
    <link rel="stylesheet" type="text/css" href="<?=CDN;?>/bower_components/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<?=CDN;?>/assets/css/login.css">
    <!-- font-awesome-n -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

    <script type="text/javascript" src="<?=CDN;?>/bower_components/jquery/js/jquery.min.js"></script>
    <script src="<?=CDN;?>/assets/apilib/apilib.js"></script>
    <script src="<?=CDN;?>/assets/apilib/apilib-init.js"></script>




</head>

<body>

    <div class="row">
        
        <div class="col-md-4"></div>
        <div class="col-md-4 text-center">
            
            <div class="login">
                

                <div><h5>Nombre</h5></div>
                <input type="text" class="form-control" id="ka_user" value="admin">
                <br><br>
                <div><h5>Contraseña</h5></div>
                <input type="password" class="form-control" id="ka_password" value="123123">
                <br><br>
                <button onclick="apilib.init.login();"><i class="fas fa-check"></i> Log in</button>

            </div>


        </div>
        <div class="col-md-4"></div>

    </div>


</body>

</html>