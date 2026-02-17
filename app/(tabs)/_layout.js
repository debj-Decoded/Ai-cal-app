
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Tabs } from 'expo-router'
import { Home05Icon } from '@hugeicons/core-free-icons'
import { Dish02Icon } from '@hugeicons/core-free-icons'
import { UserLove01Icon } from '@hugeicons/core-free-icons'
import { Loading01Icon } from '@hugeicons/core-free-icons'
export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor:"#dc6e44"  
        }}>
            <Tabs.Screen name='Home' options={{
                tabBarIcon: ({ color, size }) => <HugeiconsIcon
                    icon={Home05Icon}
                    size={size}
                    color={color}
                    strokeWidth={1.5}
                />
            }} />

            <Tabs.Screen name='Meals' options={{
                tabBarIcon: ({ color, size }) => <HugeiconsIcon
                    icon={Dish02Icon}
                    size={size}
                    color={color}
                    strokeWidth={1.5}
                />
            }}
            />
            <Tabs.Screen name='Progress'  options={{
                tabBarIcon: ({ color, size }) => <HugeiconsIcon
                    icon={Loading01Icon}
                    size={size}
                    color={color}
                    strokeWidth={1.5}
                />
            }}/>
            <Tabs.Screen name='Profile' options={{
                tabBarIcon: ({ color, size }) => <HugeiconsIcon
                    icon={UserLove01Icon}
                    size={size}
                    color={color}
                    strokeWidth={1.5}
                />
            }} />
        </Tabs>
    )
}