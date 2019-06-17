<template>
		<div class="mainDiv">
			<h2>Create Passenger</h2>
			<div class="field">
				<label class="label">First Name</label>
				<div class="control">
					<input v-model="first_name_input" class="input" type="text" placeholder="First Name">
				</div>
			</div>
			<div class="field">
				<label class="label">Last Name</label>
				<div class="control">
					<input v-model="last_name_input"  class="input" type="text" placeholder="Last Name">
				</div>
			</div>
			<div class="field">
				<label class="label">Age</label>
				<div class="control">
					<input v-model="age_input"  class="input" type="text" placeholder="Age">
				</div>
			</div>
			<div class="field">
				<label class="label">Gender</label>
				<div class="control">
					<div class="control">
					<input v-model="gender_input"  class="input" type="text" placeholder="Age">
				</div>
				</div>
			</div>
			<div class="field">
				<label class="label">Email</label>
				<div class="control">
					<input v-model="email_input" class="input" type="text" placeholder="Email">
				</div>
			</div>
			<div class="field">
				<label class="label">Phone Number</label>
				<div class="control">
					<input v-model="phone_number_input" class="input" type="text" placeholder="Phone Number">
				</div>
			</div>
			<div class="field">
				<label for="">Birthdate (DD-MM-YYYY)</label>
				<div class="control">
					<input v-model="birthdate_input" class="input" type="text" placeholder="Birthdate">
				</div>
			</div>				
			<div class="field">
				<label class="label">Occupation</label>
				<div class="control">
					<input v-model="occupation_input" class="input" type="text" placeholder="Occupation">
				</div>
			</div>
			<div class="field">
				<label class="label">Nationality</label>
				<div class="control">
					<input v-model="nationality_input" class="input" type="text" placeholder="Nationality">
				</div>
			</div>
			<div class="field">
				<label class="label">Native Language</label>
				<div class="control">
					<input v-model="native_language_input" class="input" type="text" placeholder="Native Language">
				</div>
			</div>
			<div class="field is-grouped">
				<div class="control">
					<button class="button is-link" @click="crearPasajero">Submit</button>
				</div>
				<div class="control">
					<router-link to="/passengers">
						<button class="button is-text">Back</button>
					</router-link>
				</div>
			</div>
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