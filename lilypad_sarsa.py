import sys

import os
import numpy as np
import json
import pickle

# If no arguments were passed via -i input, default to 5
grid_size = int(sys.argv[1]) if len(sys.argv) > 1 else 5

from enum import Enum


class Action(Enum):
    UP = 0
    DOWN = 1
    LEFT = 2
    RIGHT = 3


class GridWorld:
    def __init__(self, size=5):
        self.size = size
        self.reward = np.zeros((size, size))

        # Set goal to bottom-right corner of the grid
        self.goal = (size - 1, size - 1)

        self.state = None
        self.reset()

    def get_reward(self, state):
        if state == self.goal:
            return 1
        return 0

    def reset(self):
        self.state = (0, 0)
        return self.state

    def step(self, action):
        row, col = self.state

        if action == Action.RIGHT.value:
            col = min(col + 1, self.size - 1)
        elif action == Action.LEFT.value:
            col = max(col - 1, 0)
        elif action == Action.DOWN.value:
            row = min(row + 1, self.size - 1)
        elif action == Action.UP.value:
            row = max(row - 1, 0)

        self.state = (row, col)
        reward_value = self.get_reward(self.state)
        done = self.state == self.goal
        return self.state, reward_value, done, {}


class QTable:
    def __init__(self, row, col, num_actions):
        self.values = np.zeros((row, col, num_actions))

    def get_best_action(self, row, col):
        return np.argmax(self.values[row][col])

    def get_value(self, row, col, action):
        return self.values[row][col][action]


class SarsaAgent:
    def __init__(self, num_actions, alpha=0.1, gamma=0.99, epsilon=0.1):
        self.num_actions = num_actions
        self.alpha = alpha
        self.gamma = gamma
        self.epsilon = epsilon
        self.last_state = None
        self.last_action = None

    def set_q_table(self, q_table):
        self.q_table = q_table

    def choose_action(self, state):
        if np.random.uniform(0, 1) < self.epsilon:
            return np.random.randint(self.num_actions)
        else:
            row, col = state
            return self.q_table.get_best_action(row, col)

    def learn(self, state, action, reward, next_state, next_action):
        next_row, next_col = next_state
        if self.last_state is not None:
            current_q = self.q_table.get_value(next_row, next_col, next_action)
            last_q = self.q_table.values[self.last_state][self.last_action]
            update = self.alpha * (reward + self.gamma * current_q - last_q)
            self.q_table.values[self.last_state][self.last_action] += update
        self.last_state = next_state
        self.last_action = next_action

    def reset(self):
        self.last_state = None
        self.last_action = None


def train_agent(env, agent, num_episodes=100):
    for episode in range(1, num_episodes + 1):
        state = env.reset()
        action = agent.choose_action(state)
        agent.reset()
        done = False

        while not done:
            next_state, reward, done, _ = env.step(action)
            next_action = agent.choose_action(next_state)
            agent.learn(state, action, reward, next_state, next_action)
            state = next_state
            action = next_action


# Define environment and agent


env = GridWorld(grid_size)
if len(sys.argv) != 2:
    print("Please provide one arguments: Q Table", file=sys.stderr)
    print(pickle.dumps(QTable(5, 5, 4).values))
    exit(1)

q_table_json = sys.argv[1]

ns = grid_size * grid_size
na = len(list(Action))

q = QTable(grid_size, grid_size, na)
q.values = pickle.loads(q_table_json)
agent = SarsaAgent(na)
agent.set_q_table(q)
train_agent(env, agent, 1)


# Convert the entire output to a JSON formatted string
# Print the final JSON output
print(json.dumps(agent.q_table.values))

