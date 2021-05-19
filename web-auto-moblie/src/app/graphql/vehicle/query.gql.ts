import gql from 'graphql-tag';

const GET_ONE = gql`
  query getItem($id: Int!) {
    vehicleById(id: $id) {
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

const FILTER = gql`
  query filterItem(
      $filter: VehicleFilter!, $first: Int, $after: String, 
      $orderBy:VehicleOrderBy,$last: Int, $before: String
    ) {
    allVehicles(
        filter: $filter, 
        first:$first, after:$after, 
        last: $last, before:$before,
        orderBy:$orderBy
      ){
        nodes{
              id
              firstName
              lastName
              manufacturedDate
              carMake
            },
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
      }
  }
`;

const GET_AFTER = gql`
  query getAfterItem($first: Int!, $after: String, $orderBy:VehicleOrderBy ) {
    allVehiclesByLimitAndOrder(first:$first, after:$after, orderBy:$orderBy){
            nodes{
              id
              firstName
              lastName
              manufacturedDate
              carMake
            },
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
          }
  }
`;


const GET_PREVIOUS = gql`
  query getPreviousItem($last: Int, $before: String!, $orderBy:VehicleOrderBy) {
    allVehiclesByLimitAndOrder(last: $last, before:$before, orderBy:$orderBy){
            nodes{
              id
              firstName
              lastName
              manufacturedDate
              carMake
            },
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
          }
  }
`;


const GET_LIMIT = gql`
  query getLimitItem($first: Int!, $orderBy:VehicleOrderBy) {
    allVehiclesByLimitAndOrder(first:$first, orderBy:$orderBy){
            nodes{
              id
              firstName
              lastName
              manufacturedDate
              carMake
            }
            pageInfo{
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
          }
        
  }
`;



export { GET_ONE, FILTER, GET_PREVIOUS, GET_AFTER, GET_LIMIT };