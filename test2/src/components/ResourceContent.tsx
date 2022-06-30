import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import axios from "axios";
import * as React from "react";
import {useEffect,useState} from "react";
import {ActivityIndicator, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import WebViewQuillJS from "react-native-webview-quilljs";


import {RouteParams} from "../navigation/RootNavigatior";
import {ResourceType} from "../types/Resource.type";


interface ResourceProps {}

export const Resource: React.FunctionComponent<ResourceProps> = ({}) => {
    const [resources,setResources]=useState<ResourceType[]>();
    const [bodyDelta,setBodyDelta]=useState([]);
    const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

    /*useEffect(() => {
        axios
            .get<ResourceType[]>('https://api-cube.remidurieu.dev/resources')
            .then((response) => {
                setResources(response.data);
                console.log(resources)
            });
    }, []);*/
    /*axios.get('https://api-cube.remidurieu.dev/resources')
        .then((response)=>{
           setResources(response.data);
           console.log(resources);
           const lol=JSON.parse(resources);
           console.log(lol.result)

        })*/

    axios.get('https://api-cube.remidurieu.dev/resources')
        .then(async (res) => {
            setResources(res.data.result);
console.log(res.data.result.body)



        })
        .catch((err) => {
            console.log(err);
            alert("Erreur : Aucune ressource");
            return []
        });

    // @ts-ignore
    return (
        <SafeAreaView >
            {resources? (
                resources.map((resources) =>(
                    <View key={resources.id}>
                        <Text>{resources.id}</Text>
                        <Text>{resources.title}</Text>
                        <Text>{resources.type}</Text>
                        <Text>{resources.visibility}</Text>
                        <WebViewQuillJS
                            backgroundColor={"black"}
                            content={resources}

                            isReadOnly
                        />
                    </View>


                ))
                ):(
                <ActivityIndicator size="large" color="black"/>
            )}
        </SafeAreaView>
    )

};


