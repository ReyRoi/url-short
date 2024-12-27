import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [url, setUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("");
    const [analytics, setAnalytics] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = { url }

        try {
            const response = await axios.post('https://url-short-backend-sz3y.onrender.com/api/url', userData, {
                withCredentials: true
            })
            console.log(response.data.shortid)
            setShortUrl(response.data.shortid);
            alert('Short URL generated!');
        } catch (error) {
            console.error('Error generating URL:', error.message);
            alert('Failed to generate short URL.');
        }
    }

    const getAllAnalytics = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get('https://url-short-backend-sz3y.onrender.com/api/url/', {
                withCredentials: true
            })

            setAnalytics(response.data.urls);
            alert('history generated!');
        } catch (error) {
            console.error('Error generating history:', error.message);
            alert('Failed to generate history.');
        }
    }
    const handleLogout = async () => {
        try {
          await axios.get('https://url-short-backend-sz3y.onrender.com/api/users/logout', {}, { withCredentials: true });
          alert('Logged out successfully!');
          navigate('/login');
        } catch (error) {
          console.error('Logout failed:', error.message);
        }
      };
    return (
        <div className='Home'>
            <h1>Url Shortener</h1>
            <form onSubmit={handleSubmit} >
                <label>Enter the link:</label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                <button type='submit'>generate</button><br /><br />

                {shortUrl && (
                    <h3>Short URL: {`https://url-short-backend-sz3y.onrender.com/${shortUrl}`}</h3>

                )}

            </form>

            <button onClick={getAllAnalytics}> View my history</button>
            {analytics &&
                <div>
                    <h3>Your URL Analytics</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>S. No</th><br />
                                <th>Short ID</th><br />
                                <th>Redirect URL</th><br />
                                <th>Clicks</th><br />
                            </tr>
                        </thead>
                        <tbody>
                            {analytics.map((entry, index) => (
                                <tr key={entry._id}>
                                    <td>{index + 1}</td><br />
                                    <td>{entry.shortid}</td><br />
                                    <td>{entry.redirectURL}</td><br />
                                    <td>{entry.history.length}</td><br />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            <br></br><br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home
