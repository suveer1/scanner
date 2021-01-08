import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      scanned: false,
      scannedData: '',
      statebut: 'normal',
      hasCameraPermissions: false,
    };
  }
  getcamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({
      hasCameraPermissions: status==='granted',
      statebut: 'clicked',
      scanned: false,
    });
  };
  handlebarcode = async ({type, data}) => {
    console.log(data);
    this.setState({
      scanned: true,
      scannedData: data,
      statebut: 'normal',
    });
  };

  render() {
    const but = this.state.statebut;
    const scanned = this.state.scanned;
    console.log(scanned)
    const scannedData = this.state.scannedData;
    const camera = this.state.hasCameraPermissions;

    if (but === 'clicked' && camera) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handlebarcode}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (but === 'normal') {
      return (
        <View>
          <Text style={{ marginTop: 200 }}>
            {camera === true ? scannedData : 'reguestcamerapermissions'}
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: 'blue' }}
            onPress={this.getcamera}>
            <Text>Scan Qr code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
