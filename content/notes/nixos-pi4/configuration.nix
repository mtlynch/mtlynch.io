{ config, pkgs, lib, ... }:

let
  user = "mike";
  password = "somepassword";
  hostname = "pinix";
  # Versions after this commit fail.
  # https://github.com/NixOS/nixos-hardware/issues/651
  nixosHardwareVersion = "ad1114ee372a52aa0b4934f72835bd14a212a642";
in {
  imports = ["${fetchTarball "https://github.com/NixOS/nixos-hardware/archive/${nixosHardwareVersion}.tar.gz" }/raspberry-pi/4"];

  fileSystems = {
    "/" = {
      device = "/dev/disk/by-label/NIXOS_SD";
      fsType = "ext4";
      options = [ "noatime" ];
    };
  };

  time.timeZone = "America/New_York";

  i18n.defaultLocale = "en_US.UTF-8";
  i18n.extraLocaleSettings = {
    LC_ADDRESS = "en_US.UTF-8";
    LC_IDENTIFICATION = "en_US.UTF-8";
    LC_MEASUREMENT = "en_US.UTF-8";
    LC_MONETARY = "en_US.UTF-8";
    LC_NAME = "en_US.UTF-8";
    LC_NUMERIC = "en_US.UTF-8";
    LC_PAPER = "en_US.UTF-8";
    LC_TELEPHONE = "en_US.UTF-8";
    LC_TIME = "en_US.UTF-8";
  };

  networking.hostName = hostname;

  environment.systemPackages = with pkgs; [
    firefox
    vim
    curl
  ];

  services.openssh.enable = true;

  users = {
    mutableUsers = false;
    users."${user}" = {
      isNormalUser = true;
      password = password;
      extraGroups = [ "wheel" ];
      openssh.authorizedKeys.keys = [
        "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC4JsvmCGXcz4W+84YJeoIE3ydeAF/lIGPuBrDTmF1a+HYdxbdjyp4hjg9f0vOJfnYMgexwggdD9imIPYMK26qdaOx68E/ehUltqZeD+ktIcKpNe0YbjEe4GxDedHZ5MqmUaE6PBfAODiPMcNcqRIPr+u2ct/wNC3c1D8tNCb92YC0MEtFceqPukFBXt2dMfDSSMGAT8zLJ8r5GM2C8kWJf2sSB2P9ApwwKqJatqLh+6wL5cHSgAj4ZIIro0apc1Bx2+Mu0vmoWudLDhDaqZCu+Z7jR9gtw+ZdKlJt5lXeG+9rZOYj6PYOxjoKBaCzww92JrZNRHa62QxTMrTL0EXxj mike" # content of authorized_keys file
      ];
    };
  };

  # Enable GPU acceleration
  hardware.raspberry-pi."4".fkms-3d.enable = true;

  services.xserver = {
    enable = true;
    layout = "us";
    xkbVariant = "";
    displayManager.gdm.enable = true;
    desktopManager.gnome.enable = true;
  };

  hardware.pulseaudio.enable = true;

  system.stateVersion = "23.11";
}
