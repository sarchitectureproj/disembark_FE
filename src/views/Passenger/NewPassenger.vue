<template>
		<div>
				<form id="createForm">
					<h2>
						Create Passenger
					</h2>
					<div class="columns">
						<div class="column">
							<div class="form-group">
								<label for="">First Name</label>
								<input v-model="first_name_input" type="text" placeholder="First Name">
							</div>
							<div class="form-group">
								<label for="">Last Name</label>
								<input v-model="last_name_input" type="text" placeholder="Last Name">
							</div>
							<div class="form-group">
								<label for="">Age</label>
								<input v-model="age_input" type="text" placeholder="Age">
							</div>
							<div class="form-group">
								<label for="">Gender</label>
								<input v-model="gender_input" type="text" placeholder="Gender">
							</div>
							<div class="form-group">
								<label for="">Email</label>
								<input v-model="email_input" type="text" placeholder="Email">
							</div>
						</div>
						<div class="column">
							<div class="form-group">
								<label for="">Phone Number</label>
								<input v-model="phone_number_input" type="text" placeholder="Phone Number">
							</div>
							<div class="form-group">
								<label for="">Birthdate (DD-MM-YYYY)</label>
								<input v-model="birthdate_input" type="text" placeholder="Birthdate">
							</div>
							<div class="form-group">
								<label for="">Occupation</label>
								<input v-model="occupation_input" type="text" placeholder="Occupation">
							</div>
							<div class="form-group">
								<label for="">Nationality</label>
								<input v-model="nationality_input" type="text" placeholder="Nationality">
							</div>
							<div class="form-group">
								<label for="">Native Language</label>
								<input v-model="native_language_input" type="text" placeholder="Native Language">
							</div>
						</div>
					</div>
					 <input id="createBtn" type="button" value="Create" @click="crearPasajero"> 
				</form>
		</div>
</template>

<style lang = "scss">
	@import "../../styles/passenger.css";
</style>

<script>
	import axios from "axios";
	import GRAPHQL_URL from '../../server'
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
				axios.post(GRAPHQL_URL,{
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