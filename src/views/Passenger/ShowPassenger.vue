<template>
		<div>
			<!-- Update Form -->
			<div v-if="updatePassenger" class="mainDiv">
				<h2>Update Passenger</h2>
				<div class="field" id="item-fields">
					<label class="label">Fisrt Name</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="first_name_input">
					</div>
					<label class="label">Last Name</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="last_name_input">
					</div>
					<label class="label">Age</label>
					<div id="updateInput"> 
						<input  class="input" type="text" v-model="age_input">
					</div>
					<label class="label">Gender</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="gender_input">
					</div>
					<label class="label">Email</label>
					<div id="updateInput"> 
						<input  class="input" type="text" v-model="email_input">
					</div>
					<label class="label">Phone Number</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="phone_number_input">
					</div>
					<label class="label">Birthdate</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="birthdate_input">
					</div>
					<label class="label">Occupation</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="occupation_input">
					</div>
					<label class="label">Nationality</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="nationality_input">
					</div>
					<label class="label">Native Language</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="native_language_input">
					</div>
					<div class="field is-grouped">
						<div class="control">
							<button @click="updateDB()" class="button is-link">Submit</button>
						</div>
						<div class="control">
							<router-link to="/">
								<button class="button is-text">Back</button>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<!-- View One Form -->
			<div v-if="viewPassenger" class="mainDiv">
				<div class="field" id="item-fields">
					<label class="label">Fisrt Name</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="passengerData.data.passengerById.first_name"> 
					</div>
					<label class="label">Last Name</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="passengerData.data.passengerById.last_name">
					</div>
					<label class="label">Age</label>
					<div id="updateInput"> 
						<input  class="input" type="text" v-model="passengerData.data.passengerById.age">
					</div>
					<label class="label">Gender</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="passengerData.data.passengerById.gender">
					</div>
					<label class="label">Email</label>
					<div id="updateInput"> 
						<input  class="input" type="text" v-model="passengerData.data.passengerById.email">
					</div>
					<label class="label">Phone Number</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="passengerData.data.passengerById.phone_number">
					</div>
					<label class="label">Birthdate</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="passengerData.data.passengerById.birthdate">
					</div>
					<label class="label">Occupation</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="passengerData.data.passengerById.occupation">
					</div>
					<label class="label">Nationality</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="passengerData.data.passengerById.nationality">
					</div>
					<label class="label">Native Language</label>
					<div id="updateInput">
						<input  class="input" type="text" v-model="passengerData.data.passengerById.native_language">
					</div>
					<div class="field is-grouped">
						<div class="control">
							<button @click="changeMenu()" class="button is-link">Update</button>
						</div>
						<div class="control">
							<router-link to="/">
								<button class="button is-text">Back</button>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<!-- View All Form -->
			<div v-if="viewAll">
				<router-link to="/passengers/new">
					<button id="createBtn" class="button is-link">Create New</button>
				</router-link>
				<div class="columns container">
					<div class="column has-text-grey has-text-centered">
						<form @submit.prevent="consumirAPI">
							<div class="form-group">
							</div>
						</form>

						<section>
							<b-table :data="passengers.data.allPassengers"> 
								<template slot-scope="props">
									<b-table-column label="First Name" centered>
										{{ props.row.first_name }}
									</b-table-column>
									<b-table-column label="Last Name" centered>
										{{ props.row.last_name }}
									</b-table-column>
									<b-table-column label="Age" centered>
										{{ props.row.age }}
									</b-table-column>
									<b-table-column label="Gender" centered>
										{{ props.row.gender }}
									</b-table-column>
									<b-table-column label="Email" centered>
										{{ props.row.email }}
									</b-table-column>
									<b-table-column label="Phone Number" centered>
										{{ props.row.phone_number }}
									</b-table-column>
									<b-table-column label="Birthdate" centered>
										{{ props.row.birthdate }}
									</b-table-column>
									<b-table-column label="Occupation" centered>
										{{ props.row.occupation }}
									</b-table-column>
									<b-table-column label="Nationality" centered>
										{{ props.row.nationality }}
									</b-table-column>
									<b-table-column label="Native Language" centered>
										{{ props.row.native_language }}
									</b-table-column>
									<b-table-column sortable>
										<a @click="verPasajaero(props.row._id)"><span class="icon is-small"><i class="fas fa-eye"></i></span></a>
									</b-table-column>
									<b-table-column sortable>
										<a @click="borrarPasajero(props.row._id)"><span class="icon is-small"><i class="fas fa-trash"></i></span></a>
									</b-table-column>
								</template>
							</b-table>
						</section>
					</div>
				</div>
			</div>
		</div>
</template>

<style lang = "scss">
	@import "../../styles/passenger.css";
</style>

<script>
	import axios from "axios";
	import GRAPHQL_URL from '../../server';
	export default {
		name: "getPassengers",
		data(){
			return {
				passengers: [],
				currentIndex: "",
				ids: [],
				viewPassenger: false,
				viewAll: true,
				updatePassenger: false,
				passengerData: [],
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
			this.consumirAPI();
			this.guardarId();
		},
		methods: {
			consumirAPI(){
				axios.post(GRAPHQL_URL,{
					query: `{ allPassengers {
					   _id,
					   first_name,
				   	   last_name,
					   age,
					   gender,
					   email,
					   phone_number,
					   birthdate,
					   occupation
					   nationality,
					   native_language
				    }}`
				}).then(response => this.passengers = response.data)
				.catch(error => console.log(error));
			},
			guardarId(){
				axios.post(GRAPHQL_URL,{
					query: `{ allPassengers {
					   _id,
				    }}`
				}).then(response => this.ids = response.data)
				.catch(error => console.log(error));
			},
			borrarPasajero(passengerIndex){
				axios.post(GRAPHQL_URL,{
					query: `mutation {
						deletePassenger(id: "${passengerIndex}")
					}`
				}).then(this.consumirAPI(),this.$notification.open({
					message: "Pasajero eliminado exitosamente!" 
				}))
				.catch(error => console.log(error));
			},
			verPasajaero(passengerIndex){
				axios.post(GRAPHQL_URL,{
					query: `{ passengerById(id: "${passengerIndex}") {
							first_name
							last_name
							age
							gender
							email
							phone_number
							birthdate
							occupation 
							nationality
							native_language
						}
					}`
				}).then(response => this.passengerData = response.data)
				.catch(error => console.log(error));
				this.currentIndex = passengerIndex;
                this.viewPassenger = true;
				this.viewAll = false;
				this.updatePassenger = false;
			},
			changeMenu(){
				this.viewAll = false;
				this.viewPassenger = false;
				this.updatePassenger = true;
				this.first_name_input = this.passengerData.data.passengerById.first_name;
				this.last_name_input = this.passengerData.data.passengerById.last_name;
				this.age_input = this.passengerData.data.passengerById.age;
				this.gender_input = this.passengerData.data.passengerById.gender;
				this.email_input = this.passengerData.data.passengerById.email;
				this.phone_number_input = this.passengerData.data.passengerById.phone_number;
				this.birthdate_input = this.passengerData.data.passengerById.birthdate;
				this.occupation_input = this.passengerData.data.passengerById.occupation;
				this.nationality_input = this.passengerData.data.passengerById.nationality;
				this.native_language_input = this.passengerData.data.passengerById.native_language;
			},
			updateDB(){
				axios.post(GRAPHQL_URL,{
					query: `mutation {
						updatePassenger(id: "${this.currentIndex}", passenger: {
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
						})
					}`
				}).then(res => this.$notification.open({
					message: "Pasajero actualizado exitosamente!" 
				}))
				.catch(error => console.log(error));
			}
		}
	}
</script>