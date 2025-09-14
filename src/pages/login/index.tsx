"use client";

import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, message } from "antd";

export default function LoginPage() {
  const router = useRouter();

  const onFinish = (values: { username: string; password: string }) => {
    const { username, password } = values;

    // Simple fake login check
    if (username === "admin" && password === "1234") {
      message.success("Login successful ✅");
      router.push("/dashboard"); // Redirect to dashboard page
    } else {
      message.error("Invalid username or password ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card title="Login" className="w-96 shadow-lg rounded-xl">
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="Enter Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
