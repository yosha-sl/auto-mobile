import gql from 'graphql-tag';

const ADD = gql`
  mutation addItem($createVehicleInput: CreateVehicleInput!) {
    createVehicle(createVehicleInput: $createVehicleInput) {
              id
              firstName
              lastName
              email
              carMake
              carModel
              vinNumber
              manufacturedDate
          }
  }
`;

const UPDATE = gql`
  mutation updateItem($updateVehicleInput: UpdateVehicleInput!) {
    updateVehicleById(updateVehicleInput: $updateVehicleInput) {
              id
              firstName
              lastName
              email
              carMake
              carModel
              vinNumber
              manufacturedDate
          }
  }
`;

const DELETE = gql`
  mutation deleteItem($id: Int!) {
    deleteVehicleById(id:$id){
      firstName 
    }
  }
`;

export { ADD, UPDATE, DELETE };