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
        const pa ='{"result":[{"id":2,"userId":1,"visibility":"PUBLIC","state":"SUBMITTED","type":"ACTIVITY","categoryId":1,"title":"exercice 4eeee44 :)","body":[{"insert":"Hello World!\\nSome initial "},{"insert":"bold","attributes":{"bold":true}},{"insert":" text\\n"},{"insert":{"image":"0341054f-2fb3-443a-b0a9-bf52d32c0c6e"},"attributes":{"alt":""}},{"insert":"\\nok ok\\n"}],"date":"2023-05-14T17:37:43.992Z","location":"chez pépé","link":null,"updatedAt":"2022-06-28T13:01:06.718Z","createdAt":"2022-06-28T13:01:06.718Z","thumbnail":null},{"id":1,"userId":1,"visibility":"PUBLIC","state":"SUBMITTED","type":"ACTIVITY","categoryId":1,"title":"exercice 4eeee44 :)","body":[{"insert":"Hello World!\\nSome initial "},{"insert":"bold","attributes":{"bold":true}},{"insert":" text\\n"},{"insert":{"image":"d63e5325-e14f-4d82-ae3c-393084cc3f7c"},"attributes":{"alt":""}},{"insert":"\\nok ok\\n"}],"date":"2023-05-14T17:37:43.992Z","location":"chez pépé","link":null,"updatedAt":"2022-06-28T13:01:04.978Z","createdAt":"2022-06-28T13:01:04.978Z","thumbnail":"https://cdn.shopify.com/s/files/1/0249/6376/files/pixnio_2eca23e2-54c0-416f-b8f2-10bc88368e76.jpg?v=1557631143"}],"pagination":{"page":1,"pageSize":25,"pageCount":1,"total":2}}';
        const obj = JSON.parse(pa);
        console.log(obj.pagination)
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


