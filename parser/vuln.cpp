#include <iostream>
#include <string.h>

class Hat {

};

class HatManager {
public:
	HatManager();
	void Rename();
private:
	Hat* hatCollection;
	size_t hatCollectionSize;
	Hat* reserveHats;
	size_t reserveHatsSize;
	char* name;
	size_t nameLen;
	char* newName;
	size_t newNameLen;
};


HatManager::HatManager() {}

void HatManager::Rename() {
    strncpy(name, newName, newNameLen);
    delete[] newName;
}

int main()
{
  std::cout << "What is your name? ";
}
