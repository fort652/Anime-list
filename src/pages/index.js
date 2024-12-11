import { useEffect, useState } from 'react';
import { Container, Card, CardContent, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import TopNav from '@/components/TopNav'; // Import the TopNav component

export default function AnimeListPage() {
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://anilist-nine.vercel.app/api/list/route');
      setAnimeList(response.data.animeList);
    } catch (error) {
      console.error('Error fetching anime list:', error);
    }
  };

  const updateAnimeList = async () => {
    try {
      const response = await axios.get('https://anilist-nine.vercel.app/api/list/route');
      setAnimeList(response.data.animeList);
    } catch (error) {
      console.error('Error fetching anime list:', error);
    }
  };

  const handleCardClick = (anime) => {
    setSelectedAnime(anime);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedAnime(null);
  };

  return (
    <Container>
      <TopNav updateAnimeList={updateAnimeList} />
      <Grid container spacing={2} mt={2}>
        {animeList.map((anime) => (
          <Grid key={anime._id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', height: '100%', cursor: 'pointer' }} onClick={() => handleCardClick(anime)}>
              <CardContent>
                <Typography component="div" variant="h5" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth:  200 }}>
                  {anime.title}
                </Typography>
                <Typography mt={1} ml={1} variant="body2" color="text.secondary" component="div">
                  Rating: {anime.rating}/10
                </Typography>
                <Typography mt={1} ml={1} variant="body2" color="text.secondary" component="div" noWrap>
                  Description:
                </Typography>
                <Typography ml={2} variant="body2" color="text.secondary" component="div" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth:  200 }}>
                  {anime.description}
                </Typography>
                <Typography ml={1} mt={1} variant="body2" color="text.secondary" component="div" noWrap>
                  Site: {anime.link}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedAnime && (
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle fontSize={27} fontWeight={600}>{selectedAnime.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              <strong>Rating:</strong> {selectedAnime.rating}/10
            </Typography>
            <Typography variant="body1" mt={2}>
              <strong>Description:</strong> {selectedAnime.description}
            </Typography>
            <Typography variant="body1" mt={2}>
              <strong>Site:</strong> {selectedAnime.link}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
