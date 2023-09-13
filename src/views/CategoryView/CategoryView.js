import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import { createClient } from 'pexels';
import Config from 'react-native-config';

import EmptyDataView from './EmptyDataView';
import IndividualItem from './IndividualItem';
import styles from './styles';

const client = createClient(Config.PEXELS_API_KEY);

const PER_PAGE = 10;

const CategoryView = props => {
  const [canLoadNewData, setCanLoadNewData] = useState(true);
  const [carouselItems, setCarouselItems] = useState([]);
  const [isEmptyData, setIsEmptyData] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  // In case of a failure to load the query string, default it to 'Food'
  const query = props.route?.params?.query ?? 'Food';

  const separatorComponent = () => <View style={{ height: 10 }} />;

  const loadImages = async query => {
    setIsRefreshing(true);

    // To stop requesting for images when more data is not available,
    //  we are using the next_page as a flag. If present, it indicates
    //  data in the next page, else it won't come in query result at all.
    const { next_page, photos } = await client.photos.search({
      page,
      per_page: PER_PAGE,
      query,
    });
    if (!next_page) {
      setCanLoadNewData(false);
    } else {
      if (photos && photos.length > 0) {
        const list = [...carouselItems, ...photos];
        setCarouselItems(list);
        if (isEmptyData) {
          setIsEmptyData(false);
        }
      } else {
        setIsEmptyData(true);
      }
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadImages(query);
  }, [page]);

  const onIndividualImagePress = useCallback(item => {
    props.navigation.navigate('ImageDisplay', {
      id: item.id,
    });
  }, []);

  const renderIndividualItem = useCallback(
    ({ item }) => (
      <IndividualItem
        item={item}
        onIndividualImagePress={onIndividualImagePress}
      />
    ),
    [],
  );

  const renderRefreshControlComponent = (
    <RefreshControl
      colors={['orange']}
      refreshing={isRefreshing}
      title="Refreshing"
      titleColor="#FFF"
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fullScreenStyle}>
        {!isEmptyData ? (
          <>
            <View style={styles.titleTextContainerStyle}>
              <Text style={[styles.titleTextStyle]}>{`${query}`}</Text>
            </View>
            <FlatList
              data={carouselItems}
              onEndReached={() => {
                if (canLoadNewData) {
                  setPage(page + 1);
                } else {
                  Alert.alert('You have reached the end of the list');
                }
              }}
              numColumns={2}
              refreshControl={renderRefreshControlComponent}
              renderItem={renderIndividualItem}
              ItemSeparatorComponent={separatorComponent}
            />
          </>
        ) : (
          <EmptyDataView query={query} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoryView;
