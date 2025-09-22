"use client";

import { useState, useEffect } from "react";
import { Card, Typography, Button, Divider, Modal, List, Empty } from "antd";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;

type DailyProgress = {
  date: string;
  completed: number;
  total: number;
  percent: number;
};

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progressHistory, setProgressHistory] = useState<DailyProgress[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("progressHistory");
    if (savedHistory) {
      setProgressHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 via-white to-green-50 p-6">
      {/* শিরোনাম */}
      <div className="text-center mb-10">
        <Title level={2} className="text-green-800">
          🌙 দৈনিক দ্বীন ম্যানেজার
        </Title>
      </div>

      {/* হাদিস কার্ড */}
      <Card
        bordered={false}
        className="w-full max-w-xl bg-gradient-to-r from-green-50 to-green-100 shadow-md rounded-2xl mb-6"
      >
        <Paragraph className="text-center text-lg text-gray-700 leading-relaxed">
          রাসূল ﷺ বলেছেন: <br />
          <i>
            “আল্লাহর কাছে সবচেয়ে প্রিয় কাজ হলো যেটা নিয়মিত করা হয়, যদিও তা
            অল্প হয়।”
          </i>
          <br />
          <Text strong>(সহিহ আল-বুখারী)</Text>
        </Paragraph>
      </Card>

      {/* দৈনিক কাজের বাটন */}
      <Divider className="w-full max-w-xl border-green-300" />
      <div className="flex gap-4">
        <Link href="/tasks">
          <Button
            type="primary"
            size="large"
            className="bg-green-600 hover:bg-green-700 text-white px-8 rounded-xl shadow-lg"
          >
            📖 দৈনিক কাজ আপডেট করুন
          </Button>
        </Link>

        <Button
          type="default"
          size="large"
          className="px-8 rounded-xl shadow"
          onClick={() => setIsModalOpen(true)}
        >
          📊 ইতিহাস
        </Button>
      </div>

      {/* ইতিহাস Modal */}
      <Modal
        title="📊 গত ৭ দিনের ইতিহাস"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            বন্ধ করুন
          </Button>,
        ]}
      >
        {progressHistory.length > 0 ? (
          <List
            dataSource={progressHistory}
            renderItem={(p) => (
              <List.Item>
                <Text strong>{p.date}</Text> — {p.percent}% ({p.completed}/
                {p.total})
              </List.Item>
            )}
          />
        ) : (
          <Empty description="কোনো ইতিহাস পাওয়া যায়নি" />
        )}
      </Modal>
    </div>
  );
}
