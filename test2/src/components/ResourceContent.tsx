import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import axios from "axios";
import * as React from "react";
import {useEffect,useState} from "react";
import {ActivityIndicator, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";


import {RouteParams} from "../navigation/RootNavigatior";
import {ResourceType} from "../types/Resource.type";

interface ResourceProps {}

export const Resource: React.FunctionComponent<ResourceProps> = ({}) => {
    const [resources,setResources]=useState<ResourceType[]>();
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
    /*useEffect(() => {
        axios
            .get<ResourceType[]>('https://api-cube.remidurieu.dev/resources')
            .then((response) => {
                setResources(response.data);
                console.log(resources)
            });
    }, []);*/
    axios.get('https://api-cube.remidurieu.dev/resources')
        .then((response)=>{
            const Resource=(response.data);
            console.log(Resource)
           setResources( JSON.parse(resources));
            console.log(resources.pagination)
        })

    return (
        <SafeAreaView >
            {resources? (
                resources.map((resources) =>(
                    <View key={resources.id}>
                        <Text>{resources.title}</Text>
                    </View>
                ))
                ):(
                <ActivityIndicator size="large" color="black"/>
            )}
        </SafeAreaView>
    )

};


