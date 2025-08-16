import {
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  RefreshControl,
  FlatList
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { TextView } from '../components/TextView';
import { useTheme } from '../theme/useTheme';
import { Wrapper } from '../components/Wrapper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Spacer } from '@components/Spacer';
import { Button } from '@components/Button';
import Feather from 'react-native-vector-icons/Feather';

export default function RoomsList() {
  const { font, theme } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('all');

  // Sample rooms data - replace with actual data from your API/context
  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomNumber: 'R001',
      propertyName: 'Green Valley PG',
      floor: 1,
      capacity: 2,
      occupied: 2,
      status: 'occupied',
      rentAmount: 8000,
      tenantNames: ['John Doe', 'Mike Smith'],
      type: 'AC'
    },
    {
      id: 2,
      roomNumber: 'R002',
      propertyName: 'Green Valley PG',
      floor: 1,
      capacity: 3,
      occupied: 1,
      status: 'partially_occupied',
      rentAmount: 6500,
      tenantNames: ['Sarah Johnson'],
      type: 'Non-AC'
    },
    {
      id: 3,
      roomNumber: 'R003',
      propertyName: 'Green Valley PG',
      floor: 2,
      capacity: 2,
      occupied: 0,
      status: 'vacant',
      rentAmount: 7500,
      tenantNames: [],
      type: 'AC'
    },
    {
      id: 4,
      roomNumber: 'R101',
      propertyName: 'Blue Ocean Hostel',
      floor: 1,
      capacity: 4,
      occupied: 4,
      status: 'occupied',
      rentAmount: 5000,
      tenantNames: ['Alex Brown', 'Chris Wilson', 'David Lee', 'Emma Davis'],
      type: 'Non-AC'
    },
    {
      id: 5,
      roomNumber: 'R102',
      propertyName: 'Blue Ocean Hostel',
      floor: 1,
      capacity: 2,
      occupied: 0,
      status: 'vacant',
      rentAmount: 6000,
      tenantNames: [],
      type: 'AC'
    },
    {
      id: 6,
      roomNumber: 'R201',
      propertyName: 'City Center Lodge',
      floor: 2,
      capacity: 1,
      occupied: 1,
      status: 'occupied',
      rentAmount: 9000,
      tenantNames: ['Lisa Anderson'],
      type: 'AC'
    }
  ]);

  // Property filter options
  const properties = [
    { label: 'All Properties', value: 'all' },
    { label: 'Green Valley PG', value: 'Green Valley PG' },
    { label: 'Blue Ocean Hostel', value: 'Blue Ocean Hostel' },
    { label: 'City Center Lodge', value: 'City Center Lodge' }
  ];

  // Filter rooms based on selected property
  const filteredRooms = selectedProperty === 'all' 
    ? rooms 
    : rooms.filter(room => room.propertyName === selectedProperty);

  // Refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied':
        return '#EF4444'; // Red
      case 'partially_occupied':
        return '#F59E0B'; // Orange
      case 'vacant':
        return '#10B981'; // Green
      default:
        return '#6B7280'; // Gray
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'occupied':
        return 'Occupied';
      case 'partially_occupied':
        return 'Partial';
      case 'vacant':
        return 'Vacant';
      default:
        return 'Unknown';
    }
  };

  // Room Card Component
  const RoomCard = ({ room }) => (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        padding: 16
      }}
      onPress={() => {
        Alert.alert(room.roomNumber, 'Navigate to room details');
      }}>
      
      {/* Room Header */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: 12
      }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextView
              title={room.roomNumber}
              size={font.fontConfig.fontSizes.font18 || 18}
              color={theme.colors.text?.primary || '#000'}
              weight={font.fontConfig.fontWeights.bold}
            />
            <Spacer width={8} />
            <View style={{
              backgroundColor: getStatusColor(room.status),
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 12
            }}>
              <TextView
                title={getStatusText(room.status)}
                size={font.fontConfig.fontSizes.font10 || 10}
                color={theme.colors.white}
                weight={font.fontConfig.fontWeights.medium}
              />
            </View>
          </View>
          <Spacer height={4} />
          <TextView
            title={room.propertyName}
            size={font.fontConfig.fontSizes.font12 || 12}
            color={theme.colors.text?.secondary || '#666'}
            weight={font.fontConfig.fontWeights.regular}
          />
        </View>
        
        {/* Edit Button */}
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary?.light || '#DBEAFE',
            borderRadius: 8,
            padding: 8
          }}
          onPress={() => {
            Alert.alert('Edit Room', `Edit details for ${room.roomNumber}`);
          }}>
          <Feather
            name="edit-2"
            size={16}
            color={theme.colors.primary?.dark || '#2B6CB0'}
          />
        </TouchableOpacity>
      </View>

      {/* Room Details */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
      }}>
        <View style={{ flex: 1 }}>
          <TextView
            title={`Floor ${room.floor}`}
            size={font.fontConfig.fontSizes.font12 || 12}
            color={theme.colors.text?.secondary || '#666'}
            weight={font.fontConfig.fontWeights.regular}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TextView
            title={room.type}
            size={font.fontConfig.fontSizes.font12 || 12}
            color={theme.colors.text?.secondary || '#666'}
            weight={font.fontConfig.fontWeights.regular}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TextView
            title={`₹${room.rentAmount.toLocaleString()}`}
            size={font.fontConfig.fontSizes.font12 || 12}
            color={theme.colors.primary?.dark || '#2B6CB0'}
            weight={font.fontConfig.fontWeights.bold}
          />
        </View>
      </View>

      {/* Occupancy Info */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: theme.colors.neutral?.lightActive || '#E5E5E5'
      }}>
        <Feather
          name="users"
          size={14}
          color={theme.colors.text?.secondary || '#666'}
        />
        <Spacer width={6} />
        <TextView
          title={`${room.occupied}/${room.capacity} beds occupied`}
          size={font.fontConfig.fontSizes.font12 || 12}
          color={theme.colors.text?.secondary || '#666'}
          weight={font.fontConfig.fontWeights.regular}
        />
        {room.tenantNames.length > 0 && (
          <>
            <Spacer width={8} />
            <TextView
              title={`• ${room.tenantNames.join(', ')}`}
              size={font.fontConfig.fontSizes.font11 || 11}
              color={theme.colors.text?.secondary || '#666'}
              weight={font.fontConfig.fontWeights.regular}
              numberOfLines={1}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  // Property Filter Component
  const PropertyFilter = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: 16 }}
      contentContainerStyle={{ paddingHorizontal: 20 }}>
      {properties.map((property) => (
        <TouchableOpacity
          key={property.value}
          style={{
            backgroundColor: selectedProperty === property.value 
              ? theme.colors.primary?.dark || '#2B6CB0'
              : theme.colors.neutral?.lightActive || '#E5E5E5',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            marginRight: 12
          }}
          onPress={() => setSelectedProperty(property.value)}>
          <TextView
            title={property.label}
            size={font.fontConfig.fontSizes.font12 || 12}
            color={selectedProperty === property.value 
              ? theme.colors.white 
              : theme.colors.text?.secondary || '#666'}
            weight={font.fontConfig.fontWeights.medium}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // Summary Stats Component
  const SummaryStats = () => {
    const totalRooms = filteredRooms.length;
    const occupiedRooms = filteredRooms.filter(room => room.status === 'occupied').length;
    const vacantRooms = filteredRooms.filter(room => room.status === 'vacant').length;
    const partialRooms = filteredRooms.filter(room => room.status === 'partially_occupied').length;

    return (
      <View style={{
        backgroundColor: theme.colors.primary?.light || '#DBEAFE',
        margin: 20,
        borderRadius: 12,
        padding: 16
      }}>
        <TextView
          title="Summary"
          size={font.fontConfig.fontSizes.font14 || 14}
          color={theme.colors.primary?.dark || '#2B6CB0'}
          weight={font.fontConfig.fontWeights.bold}
          style={{ marginBottom: 8 }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center' }}>
            <TextView
              title={totalRooms.toString()}
              size={font.fontConfig.fontSizes.font16 || 16}
              color={theme.colors.primary?.dark || '#2B6CB0'}
              weight={font.fontConfig.fontWeights.bold}
            />
            <TextView
              title="Total"
              size={font.fontConfig.fontSizes.font10 || 10}
              color={theme.colors.primary?.dark || '#2B6CB0'}
              weight={font.fontConfig.fontWeights.regular}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <TextView
              title={occupiedRooms.toString()}
              size={font.fontConfig.fontSizes.font16 || 16}
              color="#EF4444"
              weight={font.fontConfig.fontWeights.bold}
            />
            <TextView
              title="Occupied"
              size={font.fontConfig.fontSizes.font10 || 10}
              color="#EF4444"
              weight={font.fontConfig.fontWeights.regular}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <TextView
              title={partialRooms.toString()}
              size={font.fontConfig.fontSizes.font16 || 16}
              color="#F59E0B"
              weight={font.fontConfig.fontWeights.bold}
            />
            <TextView
              title="Partial"
              size={font.fontConfig.fontSizes.font10 || 10}
              color="#F59E0B"
              weight={font.fontConfig.fontWeights.regular}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <TextView
              title={vacantRooms.toString()}
              size={font.fontConfig.fontSizes.font16 || 16}
              color="#10B981"
              weight={font.fontConfig.fontWeights.bold}
            />
            <TextView
              title="Vacant"
              size={font.fontConfig.fontSizes.font10 || 10}
              color="#10B981"
              weight={font.fontConfig.fontWeights.regular}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Wrapper
      statusBarColor={theme.colors.primary?.dark}
      bgColor={theme.colors.neutral?.background || '#F9FAFB'}
      noPadding>
      
      {/* Header */}
      <View style={{ 
        backgroundColor: theme.colors.primary?.dark || '#2B6CB0',
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginRight: 16 }}>
            <Feather
              name="arrow-left"
              size={24}
              color={theme.colors.white}
            />
          </TouchableOpacity>
          
          <View style={{ flex: 1 }}>
            <TextView
              title="All Rooms"
              size={font.fontConfig.fontSizes.font20 || 20}
              color={theme.colors.white}
              weight={font.fontConfig.fontWeights.bold}
            />
            <TextView
              title={`${filteredRooms.length} rooms found`}
              size={font.fontConfig.fontSizes.font14 || 14}
              color={theme.colors.white}
              weight={font.fontConfig.fontWeights.regular}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              padding: 8
            }}
            onPress={() => navigation.navigate('AddRoom')}>
            <Feather
              name="plus"
              size={20}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Summary Stats */}
      <SummaryStats />

      {/* Property Filter */}
      <PropertyFilter />

      {/* Rooms List */}
      <FlatList
        data={filteredRooms}
        renderItem={({ item }) => <RoomCard room={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ 
          paddingHorizontal: 20,
          paddingBottom: 20 
        }}
        ListEmptyComponent={() => (
          <View style={{ 
            alignItems: 'center', 
            justifyContent: 'center', 
            paddingVertical: 40 
          }}>
            <Feather
              name="home"
              size={48}
              color={theme.colors.text?.secondary || '#666'}
              style={{ marginBottom: 16 }}
            />
            <TextView
              title="No rooms found"
              size={font.fontConfig.fontSizes.font16 || 16}
              color={theme.colors.text?.secondary || '#666'}
              weight={font.fontConfig.fontWeights.medium}
            />
            <TextView
              title="Try selecting a different property filter"
              size={font.fontConfig.fontSizes.font12 || 12}
              color={theme.colors.text?.secondary || '#666'}
              weight={font.fontConfig.fontWeights.regular}
              style={{ marginTop: 4 }}
            />
          </View>
        )}
      />
    </Wrapper>
  );
}