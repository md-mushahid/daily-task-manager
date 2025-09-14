"use client";

import { Card, Typography, Button, Divider } from "antd";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;

export default function HomePage() {
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
      <Divider className="w-full max-w-xl border-green-300" />ß
      <Link href="/tasks">
        <Button type="primary" size="large" className="bg-green-600 hover:bg-green-700 text-white px-8 rounded-xl shadow-lg">
          📖 দৈনিক কাজ আপডেট করুন
        </Button>
      </Link>
    </div>
  );
}
