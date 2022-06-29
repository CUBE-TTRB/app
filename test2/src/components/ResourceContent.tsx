import * as React from "react";
import {useContext, useEffect, useState} from 'react';
import {ActivityIndicator,ListRenderItem,Button, Text, FlatList, Image, StyleSheet, View, ScrollView, SafeAreaView, ListRenderItem} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {getPublicResources} from "../services/ressource.service";
import {AxiosContext} from "../context/AxiosContext";
import {TouchableHighlight} from "react-native-gesture-handler";
import {ResourceType} from "../types/Resource.type";
import {tailwind} from "tailwind";
import axios from "axios";
import {SafeAreaView} from "react-native-safe-area-context";
import {CommentsType} from "../types/Comments.type";


export const ResourceContent : React.FunctionComponent = () => {
    const [resource, setResource]= useState<ResourceType>();

    const route = useRoute<RouteProp<RouteParams, "ResourceType">>();
    useEffect(() => {
        axios
            .get<ResourceType>(
                'https://api-cube.remidurieu.dev/resources'
            )
            .then((response) => {
                setResource(response.data);
            });
    }, []);

    const  renderItem: ListRenderItem<ResourceType> = ({ item }) => {
        return <ResourceItem resourceType={item} />;
    };

    return(
        <SafeAreaView style={tailwind("flex h-full justify-center items-center")}>
            {resource ? (
                <FlatList
                    data={resource.resourceType}
                    renderItem={renderItem}
                    style={tailwind("w-full")}
                    numColumns={2}
                    contentContainerStyle={tailwind("flex")}
                    keyExtractor={(item) => item.title}
                    ItemSeparatorComponent={() => (
                        <View style={tailwind("h-px bg-gray-200 my-4")} />
                    )}
                    ListHeaderComponent={() => (
                        <View style={tailwind("flex items-center p-4")}>
                            <Text style={tailwind("text-lg font-bold")}>{resource.title}</Text>
                            <Text style={tailwind("text-gray-500")}>
                                {resource.body}
                            </Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View style={tailwind("flex justify-center items-center")}>
                            <Text>Pas de Ressource trouvé</Text>
                        </View>
                    )}
                    onRefresh={() => {
                        console.log("refetch resources");
                    }}
                    refreshing={false}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        console.log("load more");
                    }}
                />
            ) : (
                <ActivityIndicator size="large" color="black" />
            )}
        </SafeAreaView>
    )



}