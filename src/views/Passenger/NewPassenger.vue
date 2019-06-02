<template>
		<div>
				<form id="createForm">
					<h2>
						Crear Pasajero
					</h2>
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
					 <input id="submitBtn" type="submit" value="Enviar"> 
				</form>
		</div>
</template>

<style lang = "scss">
	@import "../../styles/passenger.css";
</style>