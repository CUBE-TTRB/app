import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Resource} from "../components/ResourceContent";

export type RouteParams ={
    Resource: undefined;

}

const Stack = createNativeStackNavigator<RouteParams>();

export const RootNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Group
                screenOPtions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Resource" component={Resource} />
            </Stack.Group>
        </Stack.Navigator>
    )
}


