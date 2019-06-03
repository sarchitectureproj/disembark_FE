<template>
		<div>
			<h2>
				Pasajeros
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
								<th>Nombres</th>
								<th>Apellidos</th>
								<th>Edad</th>
								<th>Genero</th>
								<th>Email</th>
								<th>Telefono</th>
								<th>Fecha de nacimiento</th>
								<th>Occupacion</th>
								<th>Nacionalidad</th>
								<th>Lengua nativa</th>
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
								<td><button>Editar</button></td>
								<td><button @click="borrarPasajero(index)">Eliminar</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
</template>

<style lang = "scss">
	@import "../../styles/passenger.css";
</style>

<script>
	import axios from "axios";
	import GRPAHQL_URL from '../../server'
import GRAPHQL_URL from '../../server';
	export default {
		name: "getPassengers",
		data(){
			return {
				passengers: [],
				ids: []
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
				axios.post(GRPAHQL_URL,{
					query: `{ allPassengers {
					   _id,
				    }}`
				}).then(response => this.ids = response.data)
				.catch(error => console.log(error));
			},
			borrarPasajero(passengerIndex){
				axios.post(GRPAHQL_URL,{
					query: `mutation {
						deletePassenger(id: "${this.ids.data.allPassengers[passengerIndex]._id}")
					}`
				}).then(this.consumirAPI(),this.$notification.open({
					message: "Pasajero eliminado exitosamente!" 
				}))
				.catch(error => console.log(error));
			}
		}
	}
</script>