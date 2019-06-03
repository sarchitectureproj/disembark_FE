<template>
		<div>
			<div id="updateForm" v-if="viewPassenger" class="Preview box  container is-desktop">
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
					<input id="updateBtn" type="button" value="Update" @click="actualizarPasajero"> 
				</div>
			</div>
			<div v-if="viewAll">
				<h2>
					Passengers
				</h2>
				<div class="columns">
					<div class="column">
						<form @submit.prevent="consumirAPI">
							<div class="form-group">
							</div>
						</form>

						<table class="table table-striped">
							<thead class="thead-dark">
								<tr>
									<th>Fisrt Name</th>
									<th>Last Name</th>
									<th>Age</th>
									<th>Gender</th>
									<th>Email</th>
									<th>Phone Number</th>
									<th>Birthdate</th>
									<th>Occupation</th>
									<th>Nationality</th>
									<th>Native Language</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(passenger,index) in passengers.data.allPassengers" :key ="index">
									<!--<td>{{ids.data.allPassengers[index]._id}}</td>-->
									<td>{{passenger.first_name}}</td>
									<td>{{passenger.last_name}}</td>
									<td>{{passenger.age}}</td>
									<td>{{passenger.gender}}</td>
									<td>{{passenger.email}}</td>
									<td>{{passenger.phone_number}}</td>
									<td>{{passenger.birthdate}}</td>
									<td>{{passenger.occupation}}</td>
									<td>{{passenger.nationality}}</td>
									<td>{{passenger.native_language}}</td>
									<td><button @click="verPasajaero(index)">View</button></td>
									<td><button @click="borrarPasajero(index)">Delete</button></td>
								</tr>
							</tbody>
						</table>
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
				ids: [],
				viewPassenger: false,
				viewAll: true,
				passengerData: []
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
					   first_name,
				   	   last_name,
					   age,
					   gender,
					   email,
					   phone_number,
					   birthdate,
					   occupation
					   nationality,
					   native_language,
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
						deletePassenger(id: "${this.ids.data.allPassengers[passengerIndex]._id}")
					}`
				}).then(this.consumirAPI(),this.$notification.open({
					message: "Pasajero eliminado exitosamente!" 
				}))
				.catch(error => console.log(error));
			},
			verPasajaero(passengerIndex){
				axios.post(GRAPHQL_URL,{
					query: `{ passengerById(id: "${this.ids.data.allPassengers[passengerIndex]._id}") {
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
                this.viewPassenger = true;
				this.viewAll = false;
			},
			actualizarPasajero(){
				this.viewAll = true;
				this.viewPassenger = false;
			}
		}
	}
</script>