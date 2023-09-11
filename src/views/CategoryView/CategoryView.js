import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';

import { createClient } from 'pexels';
import Config from 'react-native-config';

import { IMAGES } from '../../data/IMAGES';
import styles from './styles';

const client = createClient(Config.PEXELS_API_KEY);

const CategoryView = props => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [isEmptyData, setIsEmptyData] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { height } = useWindowDimensions();

  // In case of a failure to load the query string, default it to 'Food'
  const query = props.route?.params?.query ?? 'Food';

  const separatorComponent = () => <View style={{ height: 10 }} />;

  const loadImages = async query => {
    setIsRefreshing(true);
    const { photos } = await client.photos.search({
      query,
      per_page: 5,
      page: 1,
    });
    if (photos && photos.length > 0) {
      setCarouselItems(photos);
      if (isEmptyData) {
        setIsEmptyData(false);
      }
    } else {
      setIsEmptyData(true);
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadImages(query);
  }, []);

  const onIndividualImagePress = item => () => {
    props.navigation.navigate('ImageDisplay', {
      id: item.id,
    });
  };

  const renderIndividualItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={onIndividualImagePress(item)}
        style={[styles.imageItemContainerStyle, { height: 0.3 * height }]}>
        <Image
          source={{ uri: item.src.medium }}
          style={styles.imageItemStyle}
        />
      </TouchableOpacity>
    );
  };

  const renderRefreshControlComponent = (
    <RefreshControl
      colors={['orange']}
      refreshing={isRefreshing}
      title="Refreshing"
      titleColor="#FFF"
    />
  );

  const EmptyDataView = () => {
    return (
      <View style={styles.emptyDataRootContainerStyle}>
        <Text style={styles.emptyDataTitleStyle}>{`${query}`}</Text>
        <Text style={styles.notFoundTextStyle}>{'Not found !'}</Text>
        <Text style={styles.notFoundTextStyle}>
          {'Try again with different text.'}
        </Text>

        <Image
          source={IMAGES.IMG_EMPTY_BOX}
          style={styles.emptyListImageStyle}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.FlatList_Container}>
        {!isEmptyData ? (
          <>
            <View style={styles.titleTextContainerStyle}>
              <Text style={[styles.titleTextStyle]}>{`${query}`}</Text>
            </View>
            <FlatList
              data={carouselItems}
              refreshControl={renderRefreshControlComponent}
              renderItem={renderIndividualItem}
              ItemSeparatorComponent={separatorComponent}
            />
          </>
        ) : (
          <EmptyDataView />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoryView;
