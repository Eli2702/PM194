import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SectionList,
  Image,
  Alert,
  SafeAreaView,
  Modal,
  Pressable,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const CATEGORIES = {
  fiction: 'Ficción',
  history: 'Historia',
  technology: 'Tecnología',
  art: 'Arte',
  science: 'Ciencia',
  biography: 'Biografía',
  travel: 'Viajes',
  religion: 'Religión',
  poetry: 'Poesía',
  cooking: 'Cocina',
};

export default function App() {
  const [category, setCategory] = useState('fiction');
  const [groupedBooks, setGroupedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setGroupedBooks([]);
      setErrorMsg(null);

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&printType=books&maxResults=20`
      );

      if (!response.ok) {
        throw new Error('Error al conectarse a Google Books.');
      }

      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        throw new Error('No se encontraron libros para esta categoría.');
      }

      const authorGroups = {};

      data.items.forEach(item => {
        const volume = item.volumeInfo;
        const authors = volume.authors || ['Autor desconocido'];
        authors.forEach(author => {
          if (!authorGroups[author]) authorGroups[author] = [];
          authorGroups[author].push({
            id: item.id,
            title: volume.title,
            description: volume.description || 'Sin descripción',
            image: volume.imageLinks?.thumbnail,
            publisher: volume.publisher || 'Editorial desconocida',
            publishedDate: volume.publishedDate || 'Fecha desconocida',
            pageCount: volume.pageCount || 'Desconocido',
            categories: volume.categories || [],
            language: volume.language,
            previewLink: volume.previewLink || null,
          });
        });
      });

      const sections = Object.keys(authorGroups).map(author => ({
        title: author,
        data: authorGroups[author],
      }));

      setGroupedBooks(sections);
    } catch (err) {
      Alert.alert('Error', err.message);
      setErrorMsg(err.message);
      setGroupedBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [category]);

  const categoryList = Object.entries(CATEGORIES);

  const openBookModal = book => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const closeBookModal = () => {
    setSelectedBook(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Lista de libros</Text>

      <Pressable style={styles.selector} onPress={() => setCategoryModalVisible(true)}>
        <Text style={styles.selectorText}>{CATEGORIES[category]}</Text>
      </Pressable>

      <Modal
        visible={categoryModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Selecciona una categoría</Text>
            <FlatList
              data={categoryList}
              keyExtractor={([key]) => key}
              renderItem={({ item: [key, label] }) => (
                <Pressable
                  style={styles.modalOption}
                  onPress={() => {
                    setCategory(key);
                    setCategoryModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{label}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : groupedBooks.length === 0 ? (
        <Text style={styles.error}>No se encontraron libros.</Text>
      ) : (
        <SectionList
          sections={groupedBooks}
          keyExtractor={(item, index) => item.id || item.title + index}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.author}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openBookModal(item)} style={styles.card}>
              {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.publisher}>📘 {item.publisher}</Text>
              <Text numberOfLines={3} style={styles.description}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeBookModal}
      >
        <View style={styles.detailModalContainer}>
          <View style={styles.detailModalBox}>
            <ScrollView>
              <Pressable style={styles.closeButton} onPress={closeBookModal}>
                <Text style={styles.closeButtonText}>Cerrar ✕</Text>
              </Pressable>
              {selectedBook && (
                <>
                  {selectedBook.image && (
                    <Image source={{ uri: selectedBook.image }} style={styles.detailImage} />
                  )}
                  <Text style={styles.detailTitle}>{selectedBook.title}</Text>
                  <Text style={styles.detailPublisher}>
                    Editorial: {selectedBook.publisher}
                  </Text>
                  <Text style={styles.detailInfo}>
                    Páginas: {selectedBook.pageCount} | Publicado: {selectedBook.publishedDate}
                  </Text>
                  <Text style={styles.detailDescription}>{selectedBook.description}</Text>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  selector: {
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectorText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    padding: 5,
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    height: 100,
    width: 70,
    alignSelf: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  publisher: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
    fontSize: 16,
  },
  detailModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  detailModalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '90%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailPublisher: {
    fontSize: 16,
    marginBottom: 5,
  },
  detailInfo: {
    fontSize: 14,
    marginBottom: 15,
    color: 'gray',
  },
  detailDescription: {
    fontSize: 16,
  },
});
