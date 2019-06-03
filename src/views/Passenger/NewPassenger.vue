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
								<input v-model="first_name_input" type="text" placeholder="Nombres">
							</div>
							<div class="form-group">
								<label for="">Apellidos</label>
								<input v-model="last_name_input" type="text" placeholder="Apellidos">
							</div>
							<div class="form-group">
								<label for="">Edad</label>
								<input v-model="age_input" type="text" placeholder="Edad">
							</div>
							<div class="form-group">
								<label for="">Género</label>
								<input v-model="gender_input" type="text" placeholder="Género">
							</div>
							<div class="form-group">
								<label for="">E-mail</label>
								<input v-model="email_input" type="text" placeholder="E-mail">
							</div>
						</div>
						<div class="column">
							<div class="form-group">
								<label for="">Teléfono</label>
								<input v-model="phone_number_input" type="text" placeholder="Teléfono">
							</div>
							<div class="form-group">
								<label for="">Fecha de nacimiento (DD-MM-YYYY)</label>
								<input v-model="birthdate_input" type="text" placeholder="Fecha de nacimiento">
							</div>
							<div class="form-group">
								<label for="">Ocupación</label>
								<input v-model="occupation_input" type="text" placeholder="Ocupación">
							</div>
							<div class="form-group">
								<label for="">Nacionalidad</label>
								<input v-model="nationality_input" type="text" placeholder="Nacionalidad">
							</div>
							<div class="form-group">
								<label for="">Lengua nativa</label>
								<input v-model="native_language_input" type="text" placeholder="Lengua nativa">
							</div>
						</div>
					</div>
					 <input id="submitBtn" value="Enviar" @click="crearPasajero"> 
				</form>
		</div>
</template>

<style lang = "scss">
	@import "../../styles/passenger.css";
</style>

<script>
	import axios from "axios";
	import GRPAHQL_URL from '../../server'
	export default {
		name: "createPassenger",
		data(){
			return {
				first_name_input: null,
				last_name_input: null,
				age_input: null,
				gender_input: null,
				email_input: null,
				phone_number_input: null,
				birthdate_input: null,
				occupation_input: null,
				nationality_input: null,
				native_language_input: null
			};
		},
		created(){
			
		},
		methods: {
			crearPasajero(){
				axios.post(GRPAHQL_URL,{
					query: `mutation {
						createPassenger(passenger: {
							first_name: "${this.first_name_input}"
							last_name: "${this.last_name_input}"
							age: ${this.age_input}
							gender: "${this.gender_input}"
							email: "${this.email_input}"
							phone_number: "${this.phone_number_input}"
							birthdate: "${this.birthdate_input}"
							occupation: "${this.occupation_input}"
							nationality: "${this.nationality_input}"
							native_language: "${this.native_language_input}"
						}) {
							first_name
						}
					}`
				}).then(res => this.$notification.open({
					message: "Pasajero creado exitosamente!" 
				}))
				.catch(error => console.log(error));
			}
		}
	}
</script>