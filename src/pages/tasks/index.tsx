"use client";
import { useEffect, useState } from "react";
import { Card, Typography, List, Checkbox, Button, message, Modal } from "antd";
import dailyTasks from "@/utils/dailyTasks";
import Link from "next/link";

const { Title } = Typography;

type DailyProgress = {
  date: string;
  completed: number;
  total: number;
  percent: number;
  tasks: { id: number; name: string; done: boolean }[];
};

export default function UserTaskPage() {
  const [tasks, setTasks] = useState<{ id: number; name: string; done: boolean }[]>([]);
  const [progressHistory, setProgressHistory] = useState<DailyProgress[]>([]);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const fetchTasks = async () => {
    const response = await dailyTasks();
    const todayHistory = progressHistory.find((p) => p.date === today);
    if (todayHistory) {
      setTasks(todayHistory.tasks);
    } else {
      setTasks(response);
    }
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("progressHistory");
    if (savedHistory) {
      setProgressHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [progressHistory]);

  useEffect(() => {
    localStorage.setItem("progressHistory", JSON.stringify(progressHistory));
  }, [progressHistory]);

  const toggleTask = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  const updateTasks = () => {
    const completed = tasks.filter((t) => t.done).length;
    const total = tasks.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    const todayHistory = progressHistory.find((p) => p.date === today);

    if (todayHistory) {
      message.warning("⚠️ আপনি আজকের কাজ ইতিমধ্যে আপডেট করেছেন!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setProgressHistory((prev) => {
        const filtered = prev.filter((p) => p.date !== today);
        const updated = [
          ...filtered,
          { date: today, completed, total, percent, tasks },
        ];
        return updated.slice(-7);
      });

      setLoading(false);
      setSuccessModalVisible(true);
    }, 1000); // simulate async delay
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <Title level={2} className="mb-6">📖 আজকের কাজ</Title>

      <Card className="w-full max-w-xl mb-4">
        <List
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item>
              <Checkbox
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              >
                {task.name}
              </Checkbox>
            </List.Item>
          )}
        />
      </Card>

      <div className="flex gap-4 mt-4">
        <Button
          className="px-8"
          type="primary"
          size="large"
          loading={loading}
          onClick={updateTasks}
        >
          ⬆️ আজকের কাজ আপডেট করুন
        </Button>

        <Link href="/" passHref>
          <Button className="px-8" type="default" size="large">
            🏠 হোমে ফিরে যান
          </Button>
        </Link>
      </div>

      {/* Success Popup */}
      <Modal
        open={successModalVisible}
        footer={null}
        onCancel={() => setSuccessModalVisible(false)}
        centered
      >
        <div className="text-center p-4">
          <h2 className="text-green-600 text-lg font-semibold mb-2">✅ সফল!</h2>
          <p>আজকের কাজ সফলভাবে আপডেট হয়েছে!</p>
        </div>
      </Modal>
    </div>
  );
}
