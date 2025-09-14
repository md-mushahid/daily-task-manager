"use client";
import { useState } from "react";
import { Card, Typography, List, Checkbox, Button, message } from "antd";

const { Title } = Typography;

export default function UserTaskPage() {
  // Static tasks
  const [tasks, setTasks] = useState<{ id: number; name: string; done: boolean }[]>([
    { id: 1, name: "ফজর নামাজ পড়া", done: false },
    { id: 2, name: "কোরআন তিলাওয়াত", done: false },
    { id: 3, name: "আসর নামাজ পড়া", done: false },
    { id: 4, name: "মাগরিব নামাজ পড়া", done: false },
    { id: 5, name: "ইশা নামাজ পড়া", done: false },
    { id: 6, name: "তাহাজ্জুদ নামাজ", done: false },
  ]);

  // Toggle task done/undone
  const toggleTask = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  // Update button action
  const updateTasks = () => {
    // For now, just show a message
    message.success("আপনার দৈনিক কাজ আপডেট হয়েছে ✅");
    console.log("Updated tasks:", tasks); // Later send to DB/API
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
    <br/>
      <Button className="px-8" type="primary" size="large" onClick={updateTasks}>
        ⬆️ দৈনিক কাজ আপডেট করুন
      </Button>
    </div>
  );
}
