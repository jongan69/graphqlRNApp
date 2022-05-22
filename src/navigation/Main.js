import React from 'react';
import Drawer from './DrawerNavigator';
import CenterSpinner from '../screens/components/Util/CenterSpinner';
import { ApolloProvider } from 'react-apollo';
import makeApolloClient from '../apollo';
import gql from "graphql-tag";
import { LogBox } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

// console.disableYellowBox = true;
LogBox.ignoreAllLogs();
// GraphQL mutation to update last_seen
const EMIT_ONLINE_EVENT = gql`
mutation {
 update_users(
   _set: {
     last_seen: "now()"
   },
   where: {}
 ) {
   affected_rows
 }
}
`;

const Main = () => {

  const [clientData, setClientData] = React.useState(null);

  const fetchSession = async () => {
    // fetch session
    const session = await AsyncStorage.getItem('@todo-graphql:session');
    const sessionObj = JSON.parse(session);
    const { token, id } = sessionObj;

    const client = makeApolloClient(token);

    setClientData(client);
    setInterval(
      () => {
        client.mutate({
          mutation: EMIT_ONLINE_EVENT,
        })
      },
      30000
    );
  }

  React.useEffect(() => {
    fetchSession();
  }, [])

  if (!clientData) {
    return <CenterSpinner />
  }

  return (
    <ApolloProvider client={clientData}>
      <Drawer />
    </ApolloProvider>
  );
}

export default Main;