import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
  ScrollView
} from "react-native";

export default function FormPage() {
  return (
    <ScrollView style={styles.container}>
      {/* Firma Adı */}
      <Text style={styles.label}>Firma Adı:</Text>
      <TextInput style={styles.input} placeholder="Firma Adı" />

      {/* Plaka - Seri Numarası */}
      <Text style={styles.label}>Plaka - Seri Numarası:</Text>
      <TextInput style={styles.input} placeholder="Plaka - Seri Numarası" />

      {/* Teslim Tarihi ve Saati */}
      <Text style={styles.label}>Teslim Tarihi ve Saati:</Text>
      <View style={styles.row}>
        <TextInput style={styles.inputHalf} placeholder="GG-AA-YYYY" />
        <TextInput style={styles.inputQuarter} placeholder="HH:MM" />
        <TextInput style={styles.inputQuarter} placeholder="SS" />
      </View>

      {/* Bitiş Tarihi */}
      <Text style={styles.label}>Bitiş Tarihi:</Text>
      <TextInput style={styles.input} placeholder="GG-AA-YYYY" />

      {/* Geliş Sebebi */}
      <Text style={styles.label}>Geliş Sebebi:</Text>
      <Picker style={styles.input}>
        <Picker.Item label="Lütfen Seçiniz" value="" />
        <Picker.Item label="Sebep 1" value="sebep1" />
        <Picker.Item label="Sebep 2" value="sebep2" />
      </Picker>

      {/* Durum */}
      <Text style={styles.label}>Durum:</Text>
      <Picker style={styles.input}>
        <Picker.Item label="Lütfen Seçiniz" value="" />
        <Picker.Item label="Durum 1" value="durum1" />
        <Picker.Item label="Durum 2" value="durum2" />
      </Picker>

      {/* Servis Öncesi Notlar */}
      <Text style={styles.label}>Servis Öncesi Notlar:</Text>
      <TextInput style={[styles.input, { height: 100 }]} multiline={true} />

      {/* Alıcı Bilgileri */}
      <Text style={styles.label}>Alıcı Bilgileri:</Text>
      <View style={styles.checkboxRow}>
        <TouchableOpacity style={styles.checkbox}>
          <Text>Muharrem Talha Soğuk</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkbox}>
          <Text>Emre Uluışık</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkbox}>
          <Text>Ferhat Özgür</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkbox}>
          <Text>Kenan Uygun</Text>
        </TouchableOpacity>
      </View>

      {/* Teslim Eden ve Teslim Alan İmzaları */}
      <Text style={styles.label}>Teslim Eden:</Text>
      <View style={styles.signatureBox}>
        <Text>Sign Here</Text>
      </View>
      <Text style={styles.label}>Teslim Alan:</Text>
      <View style={styles.signatureBox}>
        <Text>Sign Here</Text>
      </View>

      {/* Kaydet Butonu */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>KAYDET</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e8eaf6"
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold"
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inputHalf: {
    width: "50%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  inputQuarter: {
    width: "25%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  checkboxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },
  checkbox: {
    width: "45%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  signatureBox: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  saveButton: {
    backgroundColor: "#283593",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});
