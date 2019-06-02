<template>
		<div>
				<form id="createForm">
					<h2>
						Actualizar Pasajero
					</h2>
					<label for="">Ingrese id del pasajero</label>
					<input v-model="id_input" type="text" placeholder="Identificación">
					<div class="columns">
						<div class="column">
							<div class="form-group">
								<label for="">Nombres</label>
								<input type="text">
							</div>
							<div class="form-group">
								<label for="">Apellidos</label>
								<input type="text">
							</div>
							<div class="form-group">
								<label for="">Edad</label>
								<input type="text">
							</div>
							<div class="form-group">
								<label for="">Género</label>
								<input type="text">
							</div>
							<div class="form-group">
								<label for="">E-mail</label>
								<input type="text">
							</div>
						</div>
						<div class="column">
							<div class="form-group">
								<label for="">Teléfono</label>
								<input type="text">
							</div>
							<div class="form-group">
								<label for="">Fecha de nacimiento (DD-MM-YYYY)</label>
								<input type="text">
							</div>
							<div class="form-group">
								<label for="">Ocupación</label>
								<input type="text">
							</div>
							<div class="form-group">
								<label for="">Nacionalidad</label>
								<input type="text">
							</div>
							<div class="form-group">
								<label for="">Lengua nativa</label>
								<input type="text">
							</div>
						</div>
					</div>
					 <button @click="cargarInfo">Enviar</button>
					 <input id="submitBtn" type="submit" value="Enviar"> 
				</form>
		</div>
</template>

<style lang = "scss">
	@import "../../styles/passenger.css";
</style>

<script>
</script>