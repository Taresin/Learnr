import numpy as np
from enum import Enum


class Action(Enum):
    UP = 0
    DOWN = 1
    LEFT = 2
    RIGHT = 3


class QTable:
    def __init__(self, num_states, num_actions):
        self.num_states = num_states
        self.num_actions = num_actions
        self.q_table = np.zeros((num_states, num_actions))

    def get_best_action(self, state):
        return np.argmax(self.q_table[state])


class SarsaAgent:
    def __init__(self, num_states, num_actions, alpha=0.1, gamma=0.99, epsilon=0.1):
        self.num_states = num_states
        self.num_actions = num_actions
        self.alpha = alpha  # Learning rate
        self.gamma = gamma  # Discount factor
        self.epsilon = epsilon  # Exploration rate
        self.q_table = QTable(num_states, num_actions)
        self.last_state = None
        self.last_action = None

    def choose_action(self, state):
        if np.random.uniform(0, 1) < self.epsilon:
            return np.random.randint(self.num_actions)
        else:
            return self.q_table.get_best_action(state)

    def learn(self, state, action, reward, next_state, next_action):
        if self.last_state is not None:
            # Update Q-value using SARSA
            self.q_table.q_table[self.last_state, self.last_action] += self.alpha * (
                    reward + self.gamma * self.q_table.q_table[next_state, next_action] -
                    self.q_table.q_table[self.last_state, self.last_action])
        self.last_state = next_state
        self.last_action = next_action

    def reset(self):
        self.last_state = None
        self.last_action = None


class GridWorld:
    def __init__(self, size=5):
        self.size = size
        self.reward = np.zeros((size, size))

        # Define rewards for each cell
        self.goal = (3, 3)
        self.reward[3, 3] = 1  # Reward of +1 at cell (3, 3)
        self.state = None
        self.reset()

    def reset(self):
        self.state = self.get_state_hash(0, 0)
        return self.state

    def get_state_hash(self, row, col):
        return (row * self.size) + col

    def step(self, action):
        row, col = divmod(self.state, self.size)

        if action == Action.RIGHT.value:  # Move right
            col = min(col + 1, self.size - 1)
        elif action == Action.LEFT.value:  # Move left
            col = max(col - 1, 0)
        elif action == Action.DOWN.value:  # Move down
            row = min(row + 1, self.size - 1)
        elif action == Action.UP.value:  # Move up
            row = max(row - 1, 0)

        self.state = self.get_state_hash(row, col)
        reward_value = self.reward[row, col]
        done = self.state == self.get_state_hash(self.goal[0], self.goal[1])  # Terminate if reached the goal
        return self.state, reward_value, done, {}

    def render(self):
        for i in range(self.size):
            for j in range(self.size):
                if self.get_state_hash(i, j) == self.state:
                    print("x", end=" ")
                elif (i, j) == self.goal:
                    print("G", end=" ")
                else:
                    print("-", end=" ")
            print()
        print()
        print()


def train_agent(env, agent, num_episodes=100, render=False):
    for episode in range(1, num_episodes + 1):
        state = env.reset()
        action = agent.choose_action(state)
        agent.reset()
        done = False

        while not done:
            if render:
                env.render()
            next_state, reward, done, _ = env.step(action)
            next_action = agent.choose_action(next_state)
            agent.learn(state, action, reward, next_state, next_action)
            state = next_state
            action = next_action
    if render:
        env.render()

# Define environment and agent
print("Starting Gridworld")
env = GridWorld()
env.render()
agent = SarsaAgent(num_states=100, num_actions=4)  # Assuming 10x10 grid world


# Train the agent
train_agent(env, agent, 100)
print("Finished training")

print(agent.q_table)
#
# # Evaluate the trained agent
# total_rewards = 0
# num_episodes = 10
# for _ in range(num_episodes):
#     state = env.reset()
#     done = False
#     while not done:
#         action = agent.choose_action(state)
#         state, reward, done, _ = env.step(action)
#         total_rewards += reward
# print("Average reward per episode after training:", total_rewards / num_episodes)
