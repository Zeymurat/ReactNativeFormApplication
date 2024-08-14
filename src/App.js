import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Picker,
  Modal,
  ScrollView
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function HomeScreen({ navigateToForm, navigateToOtherPages }) {
  const statusBarHeight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <View style={styles.header}>
        <Image source={require("../header.jpg")} style={styles.headerImage} />

        <Text style={styles.title}>
          Kablo Test Aracı - Cihaz Kabul Kontrol Ekranı
        </Text>
      </View>

      <View style={styles.content}>
        <Button
          title="Araç / Cihaz Kabul Kontrol Formu"
          onPress={navigateToForm}
          style={styles.saveButton}
        />
        <Button
          style={styles.saveButton}
          title="Kayıtlı Araçlar / Cihazlar"
          color="#a8d1e7"
        />
        <Button
          style={styles.saveButton}
          title="Kullanılan Yedek Parça Listesi"
          color="#a8d1e7"
        />
        <Button style={styles.saveButton} title="İş Özeti" color="#a8d1e7" />
      </View>

      <Button
        title="KAYDET - GÖNDER"
        color="#28527a"
        style={styles.saveButton}
      />
    </View>
  );
}

function FormPage({ navigateBack }) {
  const [date, setDate] = useState("");
  const [firmaAdi, setFirmaAdi] = useState("");
  const [plakaSeri, setPlakaSeri] = useState("");
  const [teslimTarihi, setTeslimTarihi] = useState("");
  const [bitisTarihi, setBitisTarihi] = useState("");
  const [gelisSebebi, setGelisSebebi] = useState("");
  const [durum, setDurum] = useState("");
  const [servisNotlar, setServisNotlar] = useState("");
  const [alici, setAlici] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [currentField, setCurrentField] = useState("");

  const showDatePicker = (field) => {
    setCurrentField(field);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    if (currentField === "teslimTarihi") {
      setTeslimTarihi(formattedDate);
    } else if (currentField === "bitisTarihi") {
      setBitisTarihi(formattedDate);
    }
    hideDatePicker();
  };

  const handleSubmit = async () => {
    const formData = {
      firmaAdi,
      plakaSeri,
      teslimTarihi,
      bitisTarihi,
      gelisSebebi,
      durum,
      servisNotlar,
      alici
    };

    try {
      const response = await fetch("YOUR_EMAIL_API_ENDPOINT", {
        // Email API endpointinizi buraya ekleyin
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          to: "recipient@example.com", // E-posta adresi
          subject: "Form Bilgileri",
          text: JSON.stringify(formData, null, 2) // Form verilerini e-posta gövdesi olarak ekleyin
        })
      });

      if (response.ok) {
        alert("Form başarıyla gönderildi!");
      } else {
        alert("Form gönderimi sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Form gönderimi sırasında bir hata oluştu.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kabul Formu</Text>
      {
        <ScrollView contentContainerStyle={styles.containerF}>
          {/* Firma Adı */}
          <Text style={styles.labelF}>Firma Adı:</Text>
          <TextInput
            style={styles.inputF}
            placeholder="Firma Adı"
            value={firmaAdi}
            onChangeText={setFirmaAdi}
          />

          {/* Plaka - Seri Numarası */}
          <Text style={styles.labelF}>Plaka - Seri Numarası:</Text>
          <TextInput
            style={styles.inputF}
            placeholder="Plaka - Seri Numarası"
            value={plakaSeri}
            onChangeText={setPlakaSeri}
          />

          {/* Teslim Tarihi ve Saati */}
          <Text style={styles.labelF}>Teslim Tarihi ve Saati:</Text>
          <View style={styles.rowF}>
            <TouchableOpacity
              style={styles.inputHalfF}
              onPress={() => showDatePicker("teslimTarihi")}
            >
              <Text>{teslimTarihi || "Tarih Seçin"}</Text>
            </TouchableOpacity>

            {/* Tarih Seçici Modal */}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TextInput style={styles.inputQuarterF} placeholder="HH:MM" />
            <TextInput style={styles.inputQuarterF} placeholder="SS" />
          </View>

          {/* Bitiş Tarihi */}
          <Text style={styles.labelF}>Bitiş Tarihi:</Text>
          <TouchableOpacity
            style={styles.inputF}
            onPress={() => showDatePicker("bitisTarihi")}
          >
            <Text>{bitisTarihi || "Tarih Seçin"}</Text>
          </TouchableOpacity>

          {/* Geliş Sebebi */}
          <Text style={styles.labelF}>Geliş Sebebi:</Text>
          <TextInput
            style={styles.inputF}
            value={gelisSebebi}
            onChangeText={setGelisSebebi}
          />

          {/* Durum */}
          <Text style={styles.labelF}>Durum:</Text>
          <TextInput
            style={styles.inputF}
            value={durum}
            onChangeText={setDurum}
          />

          {/* Servis Öncesi Notlar */}
          <Text style={styles.labelF}>Servis Öncesi Notlar:</Text>
          <TextInput
            style={[styles.inputF, { height: 100 }]}
            multiline={true}
            value={servisNotlar}
            onChangeText={setServisNotlar}
          />

          {/* Alıcı Bilgileri */}
          <Text style={styles.labelF}>Alıcı Bilgileri:</Text>
          <View style={styles.checkboxRowF}>
            <TouchableOpacity
              style={styles.checkboxF}
              onPress={() => setAlici("Muharrem Talha Soğuk")}
            >
              <Text>Muharrem Talha Soğuk</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxF}
              onPress={() => setAlici("Emre Uluışık")}
            >
              <Text>Emre Uluışık</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.checkboxRowF}>
            <TouchableOpacity
              style={styles.checkboxF}
              onPress={() => setAlici("Ferhat Özgür")}
            >
              <Text>Ferhat Özgür</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxF}
              onPress={() => setAlici("Kenan Uygun")}
            >
              <Text>Kenan Uygun</Text>
            </TouchableOpacity>
          </View>

          {/* Teslim Eden ve Teslim Alan İmzaları */}
          <Text style={styles.labelF}>Teslim Eden:</Text>
          <View style={styles.signatureBoxF}>
            <Text>Sign Here</Text>
          </View>
          <Text style={styles.labelF}>Teslim Alan:</Text>
          <View style={styles.signatureBoxF}>
            <Text>Sign Here</Text>
          </View>

          {/* Kaydet Butonu */}
          <TouchableOpacity style={styles.saveButtonF} onPress={handleSubmit}>
            <Text style={styles.saveButtonTextF}>KAYDET</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButtonF} onPress={navigateBack}>
            <Text style={styles.saveButtonText}>Geri Dön</Text>
          </TouchableOpacity>
        </ScrollView>
      }
    </View>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  const navigateToForm = () => setCurrentPage("Form");
  const navigateBack = () => setCurrentPage("Home");

  return currentPage === "Home" ? (
    <HomeScreen navigateToForm={navigateToForm} />
  ) : (
    <FormPage navigateBack={navigateBack} />
  );
}

const styles = StyleSheet.create({
  containerF: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#e8eaf6",
    alignItems: "center",
    justifyContent: "center"
  },
  labelF: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold"
  },
  inputF: {
    height: 40,
    width: 500,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  rowF: {
    width: 500,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inputHalfF: {
    width: "50%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  inputQuarterF: {
    width: "25%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  checkboxRowF: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 500,
    marginBottom: 15
  },
  checkboxF: {
    width: "45%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  signatureBoxF: {
    height: 100,
    width: 500,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  saveButtonF: {
    backgroundColor: "#283593",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  saveButtonTextF: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  backButtonF: {
    marginTop: 20,
    backgroundColor: "#a8d1e7",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  backButtonTextF: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold"
  },

  container: {
    flex: 1,
    backgroundColor: "#d4e9f3", // Ana arkaplan rengi
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#84a9c0"
  },
  headerImage: {
    width: 350,
    height: 250,
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center"
  },
  content: {
    width: 1600,
    padding: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: 250,
    padding: 25,
    backgroundColor: "#a8d1e7",
    marginVertical: 10,
    borderRadius: 50,
    marginTop: 20,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 16,
    color: "#333"
  },
  saveButton: {
    width: 250,
    padding: 15,
    backgroundColor: "#28527a",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20
  },
  saveButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold"
  }
});
