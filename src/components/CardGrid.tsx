import React, { useEffect, useState } from 'react';
import { Avatar, Card, Col, Descriptions, List, Row, Space, Statistic, Button } from 'antd';
import { supabaseClient } from 'src/utility'; // Import the supabase client instance
import Meta from 'antd/lib/card/Meta';

// Define an interface for the data structure
interface CardData {
  projects: string;
  id: number;
  title: string;
  cardContent: string;
  tasks: string;
  posts: string;
  status: string;
  avatar_url: string; 
  description: string;
  items: string;
}

const CardGrid: React.FC = () => {
  // State to hold the data fetched from the backend
  const [data, setData] = useState<CardData[]>([]);

  // useEffect hook to fetch data from the backend when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      // Fetch data from Supabase
      const { data: fetchedData, error } = await supabaseClient
        .from('categories') // Specify the interface type for the data
        .select('*');
      
      if (error) {
        throw new Error('Failed to fetch data');
      }
      
      // Update the state with the fetched data
      setData(fetchedData || []); // Handle the case where fetchedData is null
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Row gutter={[16, 16]}> {/* Add gutter with a vertical spacing of 16 units */}
      {data.map((item) => (
        <Col span={8} key={item.id} xs={24} sm={12} md={8} lg={6} xl={6}> {/* Specify the desired column size for each card */}
          <Card
            title={item.projects}
            cover={
              <Avatar 
                size={150} // Set the size of the avatar
                shape='square' 
                alt="avatar" 
                src={item.avatar_url} 
                style={{ 
                  display: 'block', // Ensure the avatar is a square by removing any inherited styles
                  margin: '0 auto', // Center the avatar horizontally
                  marginBottom: 16 // Add margin to the bottom of the avatar
                }} 
              />
            }
          >
            <Meta title={item.description} description={item.status} />
            <br/>
            <Button type="primary" href={item.avatar_url}> Details</Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardGrid;
